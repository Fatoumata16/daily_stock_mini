const vente=require('../modeles/vente')
const sequelize = require('../configuration/sequelize_config');
const { Op } = require('sequelize');

const produit=require('../modeles/produit')
class VenteService {
    async creer(date_vente,id_user){
    try {      
      await vente.create({date_vente,id_user})
    } catch (error) {
       throw error
    }
    }
    async  modifierUser(id_vente, ventee) {
        try {
          const res = await vente.findByPk(id_vente);
          if (res === null) {
            throw new Error('utilisateur non trouvé');
          } else {
            const updatedUser = {id_user:ventee.id_user }; // Initialiser avec les attributs à mettre à jour
      
            if (ventee.date_vente !== undefined) {
              updatedUser.date_vente = new Date(ventee.date_vente) ;
            }
         const resultat=  await vente.update(updatedUser, { where: { id_vente} });
           return resultat;
          }
        } catch (error) {
          console.log(error)
          throw new Error(error);
        }
      }
async supprimerparid(id_vente){
    try {
  const vent=await    vente.findByPk(id_vente)
  if(vent){
    return await  vente.destroy({where:{id_vente}})
  }
  else{
    throw new Error("ce enregistrement n'existe pas")
  }
    } catch (error) {
      throw new Error(error)
    }
  }
  async lister(id_user) {
    try {
    const tout= await vente.findAll({where:{id_user}})
    if(tout.length===0){
      throw new Error ('le tableau est vide') }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }
  async  getLastVente(id_user) {
    try {
      const lastVente = await vente.findOne({
        where:{id_user:id_user},
        order: [['date_vente', 'DESC']],
        limit: 1
      });
      return lastVente;
    } catch (error) {
      throw error;  }
  }
  async  getVenteByDate(laDate,id_user) {
    try {
      const date=new Date(laDate)
      const ventes = await vente.findAll({
        where:{
          id_user:id_user,
          date_vente:date
        }});
      return ventes;
    } catch (error) {
      throw error; }
  }
  async  montantTotalVente(id_vente,id_user) {
    try {
      const totalAmountResult = await vente.findAll({
        attributes: ["id_vente",
          [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
          [sequelize.fn('SUM', sequelize.col('produits.prix_vente')), 'total'],
        ],
        include: [ {
            model: produit,
            where:{id_user:id_user},
            attributes: [ "prix_vente" ],  }, ],
            where:{id_vente:id_vente,id_user:id_user},
        group: ['vente.id_vente'],
        raw: true,      });
      if (!totalAmountResult) {
        throw new Error('vente non trouvé.');
      }
      return totalAmountResult.map(laVente => ({
        id_vente: laVente.id_vente,
        total_prix_vente_produit: laVente.total, // Ajoutez d'autres attributs ici
        total_quantite: laVente.total_amount,
        total_montant_vente:laVente.total_amount * laVente.total,
      }));
    } catch (error) {
      throw new Error(error);
    }
  }
  async montantTotalVenteByDateInterval(dateDebut, dateFin,id_user) {
    const startDate=new Date(dateDebut)
    const endDate=new Date(dateFin)
    try {
      const totalAmountResult = await vente.findAll({
        attributes: [
          "id_vente",
          [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
          [sequelize.fn('SUM', sequelize.col('produits.prix_vente')), 'total'],
        ],
        include: [ {
            model: produit,
            where:{id_user:id_user},
            attributes: ["prix_vente"],}, ],
        where: {
          id_user:id_user,
          date_vente: {
            [Op.between]: [startDate, endDate],   },  },
        group: ['vente.id_vente'],
        raw: true,
      });
      return totalAmountResult.map(laVente => ({
        id_vente: laVente.id_vente,
        total_produit: laVente.total, 
        total_quantite: laVente.total_amount,
        total_montant_vente: laVente.total_amount * laVente.total,
      }));
    } catch (error) {
      throw new Error(error);
    }
  }
  async  montantTotalVenteParUser(id_user) {
    try {
      const totalAmountResult = await vente.findAll({
        attributes: ["id_vente",
          [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
          [sequelize.fn('SUM', sequelize.col('produits.prix_vente')), 'total'],
        ],
        where:{
        id_user
        },
        include: [ {
            model: produit,
            attributes: [ "prix_vente" ],  }, ],
        group: ['vente.id_vente'],
        raw: true,      });
      return totalAmountResult.map(laVente => ({
        id_vente: laVente.id_vente,
        total_produit: laVente.total,
        total_quantite: laVente.total_amount,
        total_montant_vente:laVente.total_amount * laVente.total,
      }));
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = new VenteService();