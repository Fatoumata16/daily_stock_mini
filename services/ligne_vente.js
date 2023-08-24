const vente = require('../modeles/vente');
const produit = require('../modeles/produit');
const ligne_vente = require('../modeles/ligne_vente');
const stockModel=require('../modeles/stock')
class LigneVenteService {
  async creer(id_vente, id_produit, quantite,id_user) {
    try {
      const ventes = await vente.findOne({where:{id_vente,id_user}});
      if (ventes === null) {
        throw new Error("Vente non trouvée");
      } else {
        const produits = await produit.findOne({where:{id_produit,id_user}});
        if (produits === null) {
          throw new Error("Produit non trouvé");
        } else {
          await ventes.addProduit(produits, { through: { quantite: quantite } });
          await  this.updateStockForProduct(id_produit,quantite);
          return "Produit ajouté à la vente avec succès"; } }
    } catch (error) {
      throw new Error(error.message); }
  }
  async creerOuModifier(id_vente, id_produit, quantite) {
    try {
      const ventes = await vente.findByPk(id_vente);
      if (ventes === null) {
        throw new Error("Vente non trouvée");
      } else {
        const produits = await produit.findByPk(id_produit);
        if (produits === null) {
          throw new Error("Produit non trouvé");
        } else {
          const existingLigneAppro = await ventes.getProduits({ where: { id_produit: id_produit} });
          if (existingLigneAppro.length > 0) {
            await ventes.setProduits(produits, { through: { quantite: quantite } });  
             return "Quantité mise à jour avec succès";
          } else {
            await ventes.addProduit(produits, { through: { quantite: quantite } });
            return "Produit ajouté à la vente avec succès";
          }
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async supprimer(id_vente, id_produit) {
    try {
      const ventes = await vente.findByPk(id_vente);
      if (ventes === null) {
        throw new Error("Vente non trouvée");
      } else {
        const produits = await produit.findByPk(id_produit);
        if (produits === null) {
          throw new Error("Produit non trouvé");
        } else {
          await ventes.removeProduit(produits);
          return "Relation vente-produit supprimée avec succès";  }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async  listeLigneVente(id_user) {
    try {
      const produits = await produit.findAll({
        attributes: ["libelle","stock_min","prix_achat","prix_vente"],
        include: [
          {
            model: vente,
            through: {
              attributes: ["quantite"], 
            },
            attributes: ["id_vente","date_vente","id_user"], 
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
  async  TrouverLigneVenteParIdVente(id) {
    try {
      const ligneVente = await ligne_vente.findAll({
        where:{
          id_vente:id
        }
      });
      return ligneVente;
      } catch (erreur) {

        throw new Error(erreur);
      } } 
  async  updateStockForProduct(id_produit,quantite) {
    try {
      const resultat=await stockModel.findOne({where:{id_produit}})
      if(resultat){
      const newQuantite= resultat.quantite - quantite
      if(newQuantite >= 0){
        await stockModel.update(
          { quantite: newQuantite },
          { where: {id_produit} } );
      }
      else{
        throw new Error("vous ne pouvez plus ventre ce produit  car sa quantite en stock est epuise ")
      }
         }
      else{
       throw new Error("ce produit n'est pas approvisionne")
      }
    } catch (error) {
      throw new Error(error);
    }
}
}
module.exports = new LigneVenteService();
