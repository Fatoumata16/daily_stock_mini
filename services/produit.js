const produit=require('../modeles/produit')
const stock=require('../modeles/stock')
const fs = require('fs');
const venteModel=require('../modeles/vente')
const approModel=require('../modeles/appro')
const sequelize = require('../configuration/sequelize_config');
class ProduitService {
    async creer(produits,path,id_user){
    const  {libelle,stock_min,prix_achat,prix_vente}=produits;
    try {
      let id;
  const p=    await produit.findOne({where:{libelle,id_user}})
      if(p){
        throw new Error('ce produit existe deja')
      }
     const leproduit= await produit.findOne({where:{id_user:id_user},  order: [['id_produit', 'DESC']],
      limit: 1})
      if(leproduit){
        id=leproduit.id+1
      }
      else{
        id=1
      }
      await produit.create({id,libelle,stock_min,prix_achat,prix_vente,path,id_user})
    } catch (error) {
       throw error
    }
    }
    async  modifierProduit(id_produit, produits,path) {
        try {
          const resultatProduit = await produit.findByPk(id_produit);
          if (resultatProduit === null) {
            throw new Error('produit non trouvé');
          } else {
            const updatedProduit = { stock_min:produits.stock_min }; // Initialiser avec les attributs à mettre à jour
      
            if (produits.libelle !== undefined) {
              const p=    await produit.findOne({where:{libelle:produits.libelle}})
            if(p){
              throw new Error('ce produit existe deja')
            }
              updatedProduit.libelle = produits.libelle;
            }
            if (produits.prix_achat !== undefined) {
              updatedProduit.prix_achat = produits.prix_achat;
            }
            if (produits.prix_vente !== undefined) {
              updatedProduit.prix_vente = produits.prix_vente;
            }
            if (path !== "") {
              const filename = resultatProduit.path.split('/images/')[1];
              fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                  console.error('Erreur lors de la suppression de l\'ancienne image :', err);
                }
              });
              updatedProduit.path = path;
            }
            return await produit.update(updatedProduit, { where: { id_produit} });
          }
        } catch (error) {
          throw new Error(error);
        }
      }
async supprimerParId(id_produit){
    try {
   const produits=await   produit.findByPk(id_produit)
   if(produits){
    const filename = produits.path.split('/images/')[1];
   fs.unlink(`images/${filename}`, (err) => {
       if (err) {
           console.error('Erreur lors de la suppression de l\'ancienne image :', err);
         }
   })
    return await  produit
    .destroy({where:{id_produit}})}
    throw new Error("ce produit n'existe pas")
    } catch (error) {
      throw new Error(error)
    }
  }
  async lister(id_user) {
    try {
    const tout= await produit.findAll({where:{id_user:id_user}})
    if(tout.length===0){
      return 'le tableau est vide'
    }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }
  async trouverParLibelle(libelle,id_user) {
    try {
    const tout= await produit.findOne({where:{libelle:libelle,id_user:id_user}}
      )
    if(tout===null){
      throw new Error ('ce produit n existe pas')
    }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }
async  leProduitLePlusApprovisionner(id_user) {
  try {
    return await produit.findAll({
      attributes: [
       'id_produit',
        'id',
        'libelle',
        [
          sequelize.fn('SUM', sequelize.col('appros->ligne_appro.quantite')),
          'totalAppro'
        ],
      ],
      subQuery: false,      
      include: [
        {
          model: approModel,
          as: 'appros',
          attributes: [],
          through: { attributes: [] }, 
        },
      ],
      where:{id_user:id_user},
      group: ['produit.id_produit'],
      order: [[sequelize.literal('totalAppro'), 'DESC']],
      limit: 1,
    });
  } catch (error) {
    throw new Error(error);
  }
}
async  leProduitLePlusVendu(id_user) {
  try {
    return await produit.findAll({
      attributes: [
        'id_produit',
        'id',
        'libelle',
        [
          sequelize.fn('SUM', sequelize.col('ventes->ligne_vente.quantite')),
          'totalvente'
        ],
      ],
      subQuery: false,      

      include: [
        {
          model: venteModel,
          as: 'ventes',
          attributes: [],
          through: { attributes: [] },
        },
      ],
      where:{id_user:id_user},
      group: ['produit.id_produit'],
      order: [[sequelize.literal('totalvente'), 'DESC']],
      // limit: 1,
    });
  } catch (error) {
    throw new Error(error);
  }
}
async  getProductsInStockAlert(id_user) {
  try {
    const products = await produit.findAll({
      attributes: [
        'id_produit',
        'id',
        'libelle',
        'stock_min',
        [sequelize.fn('SUM', sequelize.col('stock.quantite')), 'total_stock'], ],
      include: [ {
          model: stock,
          attributes: [], },  ],
          where:{id_user:id_user},
          group: ['produit.id_produit'],
       having: sequelize.where(sequelize.literal('total_stock'), '<=', sequelize.col('stock_min')), 
    }); return products;
  } catch (error) {
    throw new Error(error); }}

    async inventaireProduit(id_produit) {
      try {
        const product = await produit.findOne({
          attributes: [
            "id", "libelle","stock_min", "prix_achat",  "prix_vente" ],
          include: [ {
              model: approModel,
              as: 'appros',
              through: {
                attributes: ["quantite"],  },
              attributes: ["id","date_appro","id_user"],   }, {
              model: venteModel,
              as: 'ventes',
              through: {
                attributes: ["quantite"],   },
              attributes: ["id"],   },  {
              model: stock,
              as: 'stock',
              attributes: ["quantite"],  },  ],
          where: {
            id_produit: id_produit,  }, });
  
        const totalAppro = await approModel.sum("quantite", {
          include: {
            model: produit,
            where: {
              id_produit: id_produit,   },  }, });
  
        const totalVentes = await venteModel.sum("quantite", {
          include: {
            model: produit,
            where: {
              id_produit: id_produit,
            },
          },
        });
        return {product,totalAppro,totalVentes};
      } catch (error) { throw new Error(error); } }
}
module.exports = new ProduitService();
// exemple d'utilisation d'une transaction en sequelize qui va  permettre d'executer plusieurs requete en meme temps donc si un echoue les autres aussi
// const { sequelize } = require('./sequelizeconfig');

// // Fonction pour ajouter un utilisateur et son profil associé en utilisant une transaction
// async function ajouterUtilisateurEtProfil(utilisateurData, profilData) {
//   // Démarrer une transaction
//   const t = await sequelize.transaction();
  
//   try {
//     // Créer un nouvel utilisateur avec les données fournies, dans le cadre de la transaction
//     const nouvelUtilisateur = await Utilisateur.create(utilisateurData, { transaction: t });

//     // Créer un nouveau profil associé à l'utilisateur, dans le cadre de la transaction
//     const nouveauProfil = await Profil.create({
//       ...profilData,
//       id_utilisateur: nouvelUtilisateur.id, // Lier le profil au nouvel utilisateur créé
//     }, { transaction: t });

//     // Valider la transaction (confirmer les modifications)
//     await t.commit();
//     console.log('Utilisateur et profil ajoutés avec succès !');
//   } catch (error) {
//     // En cas d'erreur, annuler la transaction (annuler les modifications)
//     await t.rollback();
//     console.error('Erreur lors de l\'ajout de l\'utilisateur et du profil :', error);
//     throw new Error(error);
//   }
// }






