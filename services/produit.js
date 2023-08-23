const ligne_appro=require('../modeles/ligne_appro')
const produit=require('../modeles/produit')
const user=require('../modeles/user')
const stock=require('../modeles/stock')
const fs = require('fs');
const { Op } = require('sequelize');
const venteModel=require('../modeles/vente')
const approModel=require('../modeles/appro')
const ligne_vente=require('../modeles/ligne_vente')
const sequelize = require('../configuration/sequelize_config');
class ProduitService {
    async creer(produits,path,id_user){
    const  {libelle,stock_min,prix_achat,prix_vente}=produits;
    try {
  const p=    await produit.findOne({where:{libelle,id_user}})
      if(p){
        throw new Error('ce produit existe deja')
      }
      await produit.create({libelle,stock_min,prix_achat,prix_vente,path,id_user})
    } catch (error) {
       throw error
    }
    }
    async  modifierProduit(id_produit, userr,path) {
        try {
          const res = await produit.findByPk(id_produit);
          if (res === null) {
            throw new Error('produit non trouvé');
          } else {
            const updatedProduit = { stock_min:userr.stock_min }; // Initialiser avec les attributs à mettre à jour
      
            if (userr.libelle !== undefined) {
              const p=    await produit.findOne({where:{libelle:userr.libelle}})
            if(p){
              throw new Error('ce produit existe deja')
            }
              updatedProduit.libelle = userr.libelle;
            }
            if (userr.prix_achat !== undefined) {
              updatedProduit.prix_achat = userr.prix_achat;
            }
            if (userr.prix_vente !== undefined) {
              updatedProduit.prix_vente = userr.prix_vente;
            }
            if (path !== "") {
              const filename = res.path.split('/images/')[1];
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
          console.log(error)
          throw new Error(error);
        }
      }
async supprimerParId(id_produit){
    try {
   const p=await   produit.findByPk(id_produit)
   if(p){
    const filename = p.path.split('/images/')[1];
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
      throw new Error ('le tableau est vide')
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
  //     // products.forEach(product => {
  //     //   product.stockDifference = (product.totalAppro || 0) - (product.totalVente || 0);
  //     //   delete product.totalAppro;
  //     //   delete product.totalVente;
  //     // });
  //     return products; 
  //   } catch (error) {
  //     console.error(
  //       'Erreur lors de la récupération des produits en alerte de stock min :',
  //       error
  //     );
  //     throw error;
  //   }
  // }
  
//   async lister(id_user) {
//     try {
//         const tout = await produit.findAll({
//             attributes: [
//                 "id_produit"
//             ],
//             include: [
//                 {
//                     model: approModel,
                   
//                 }
//             ],
//             where:{id_user:id_user}
//         });

//         return tout;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }
// const user = await User.create({
//   username: 'alice123',
//   isAdmin: true
// }, { fields: ['username'] });
// // let's assume the default of isAdmin is false
// console.log(user.username); // 'alice123'
// console.log(user.isAdmin); // false
async  leProduitLePlusApprovisionner(id_user) {
  try {
    return await produit.findAll({
      attributes: [
        'id_produit',
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
          through: { attributes: [] }, // Ne pas récupérer les attributs de la table de liaison
        },
      ],
      where:{id_user:id_user},
      group: ['produit.id_produit'],
      order: [[sequelize.literal('totalAppro'), 'DESC']],
      limit: 1,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
async  leProduitLePlusVendu(id_user) {
  try {
    return await produit.findAll({
      attributes: [
        'id_produit',
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
          through: { attributes: [] }, // Ne pas récupérer les attributs de la table de liaison
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
// async lister() {
//   try {
//     const dateLimite = new Date('2023-08-09'); 
//   const tout= await approModel.findAll(
//     {
//       where:{date_appro :{
//         [Op.gte]: dateLimite,
//       }},
//       include:produit
//     }
//   )
//    return tout
//   } catch (error) {
//     throw new Error(error);
//   }
// }
// async lister() {
//   try {
//     return await approModel.findAll({
//       include: [
//         {
//           model: produit,
//           include: [
//             {
//               model: user, // L'utilisateur associé au produit
//               attributes: ['login'],
//             },
//           ],
//         },
//         {
//           model: user, // L'utilisateur associé à l'approvisionnement
//           attributes: ['login'],
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error)
//     throw new Error(error); }
// }
async  getProductsInStockAlert(id_user) {
  try {
    const products = await produit.findAll({
      attributes: [
        'id_produit',
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






