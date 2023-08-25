const produit = require('../modeles/produit');
const { Op } = require('sequelize');
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
          const resultatStock = await stock.findByPk(id_stock);
          if (resultatStock === null) {
            throw new Error('stock non trouvé');
          } else {
            const updatedStock = {quantite:stocks.quantite }; 
      
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
  async lister(id_user) {
    try {
      const tout=   produit.findAll({
          include:
          {
         model:stock,
         where: {
          quantite: {
              [Op.not]: null  // Filtre pour les stocks avec une quantité non nulle
          }
      }
         
          },
          where:{id_user:id_user}
        })
        
    // await stock.findAll()
    // if( tout is){
    //   return 'le tableau est vide'
    // }
  
     return tout
    } catch (error) {
      throw new Error(error);

    }
  }
}
module.exports = new StockService();









