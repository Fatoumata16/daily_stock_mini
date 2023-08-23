const stock=require('../modeles/stock')
class StockService {
    async creer(quantite,id_produit){
    try {      
      await stock.create({quantite,id_produit})
    } catch (error) {
       throw error
    }
    }
    async  modifierStock(id_stock, stocks) {
        try {
          const res = await stock.findByPk(id_stock);
          if (res === null) {
            throw new Error('stock non trouvé');
          } else {
            const updatedStock = {quantite:stocks.quantite }; // Initialiser avec les attributs à mettre à jour
      
            if (stocks.id_produit !== undefined) {
              updatedStock.id_produit = stocks.id_produit;
            }
            
            return await stock.update(updatedStock, { where: { id_stock} });
          }
        } catch (error) {
          throw new Error(error);
        }
      }

async supprimerParId(id_stock){
    try {
     return await  stock.destroy({where:{id_stock}})
    } catch (error) {
      throw new Error(error)

    }
  }
  async lister() {
    try {
    const tout= await stock.findAll()
    if(tout.length===0){
      throw new Error ('le tableau est vide')
    }
     return tout
    } catch (error) {
      throw new Error(error);

    }
  }
}
module.exports = new StockService();









