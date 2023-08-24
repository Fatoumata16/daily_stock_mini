const approModel = require('../modeles/appro');
const produitModel = require('../modeles/produit');
const venteModel=require('../modeles/vente')
const ligneapproModel=require('../modeles/ligne_appro')
const stockModel=require('../modeles/stock')
const ligneVenteModel=require('../modeles/ligne_vente')
class LigneApproService {
  async creer(id_appro, id_produit, quantite,id_user) {
    try {
      const approInstance = await approModel.findOne({where:{id_appro,id_user}});
      if (!approInstance) {
        throw new Error("Appro non trouvée");
      } else {
        const produitInstance = await produitModel.findOne({where:{id_produit,id_user}});
        if (!produitInstance) {
          throw new Error("Produit non trouvé");
        } else {
          await produitInstance.addAppro(approInstance, {
            through: {
              quantite: quantite,
            },
          });
        await  this.updateStockForProduct(id_produit,quantite);
          return "Produit ajouté à l'appro avec succès";
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async creerOuModifier(id_appro, id_produit, quantite) {
    try {
      const appros = await approModel.findByPk(id_appro);
      if (appros === null) {
        throw new Error("appro non trouvée");
      } else {
        const produits = await produitModel.findByPk(id_produit);
        if (produits === null) {
          throw new Error("Produit non trouvé");
        } else {
          const existingLigneAppro = await appros.getProduits({ where: { id_produit: id_produit} });
          if (existingLigneAppro.length > 0) {
            await appros.setProduits(produits, { through: { quantite: quantite } });
             return "Quantité mise à jour avec succès";
          } else {  await appros.addProduits(produits, { through: { quantite: quantite } });
            return "Produit ajouté à l' appro avec succès";
          }   }   }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async supprimer(id_appro, id_produit) {
    try {
      const appros = await approModel.findByPk(id_appro);
      if (appros === null) {
        throw new Error("appro non trouvée");
      } else {
        const produits = await produitModel.findByPk(id_produit);
        if (produits === null) {
          throw new Error("Produit non trouvé");
        } else {
          await appros.removeProduit(produits);
          return "Relation appro-produit supprimée avec succès";
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async  listeLigneAppro(id_user) {
    try {
      const produits = await produitModel.findAll({
        attributes: ["libelle","stock_min","prix_achat","prix_vente"],
        include: [
          {
            model: approModel,
            through: {
              attributes: ["quantite"], 
            },
            attributes: ["id_appro","date_appro","id_user"], 
            // where:{id_user:id_user}
          },
        ],
        where:{id_user:id_user}
      });
      return produits;
      } catch (erreur) {
        
        throw new Error(erreur);
      }
  } 
  async  updateStockForProduct(id_produit,quantite) {
    try {
      const resultat=await stockModel.findOne({where:{id_produit}})
      if(resultat){
      const newQuantite= resultat.quantite + quantite
       await stockModel.update(
         { quantite: newQuantite },
         { where: {id_produit} } );  }
      else{
       await stockModel.create({quantite,id_produit})
      }
    } catch (error) {
      throw new Error(error);
    }
}
}
module.exports= new LigneApproService();

