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
          const resultat = await vente.findByPk(id_vente);
          if (resultat === null) {
            throw new Error('utilisateur non trouvé');
          } else {
            const updatedUser = {id_user:ventee.id_user }; 
      
            if (ventee.date_vente !== undefined) {
              updatedUser.date_vente = new Date(ventee.date_vente) ;
            }
         const resultat=  await vente.update(updatedUser, { where: { id_vente} });
           return resultat;
          }
        } catch (error) {
          throw new Error(error);
        }
      }
async supprimerparid(id_vente){
    try {
  const ventes=await    vente.findByPk(id_vente)
  if(ventes){
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
  async  montantTotalVente(id_vente,id_user) {
    try {
      const totalAmountResult = await vente.findAll({
        attributes: ["id_vente",
          [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
          [sequelize.fn('SUM', sequelize.col('produits.prix_vente')), 'total'],
        ],
        include: [ {
            model: produit,
            attributes: [ "prix_vente" ],  }, ],
            where:{id_vente:id_vente,id_user:id_user},
        group: ['vente.id_vente'],
        raw: true,      });
      if (!totalAmountResult) {
        throw new Error('vente non trouvé.');
      }
      return totalAmountResult.map(laVente => ({
        id_vente: laVente.id_vente,
        total_prix_vente_produit: laVente.total, 
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
  async listerVenteByDate(dateDebut, dateFin,id_user) {
    try {
        let whereClause = {};
        if (dateDebut && dateFin) {
            whereClause = {
              date_vente: {
                    [Op.between]: [dateDebut, dateFin],
                },
            };
        } else if (dateDebut) {
            whereClause = {
              date_vente: dateDebut,
            };
        }
        const ventes = await vente.findAll({
            where: { id_user: id_user,
              ...whereClause},
            include: [ {
              model: produit,
              attributes: [ "id_produit","libelle"
            ], }, ],
        });

        if (ventes.length === 0) {
            throw new Error('Le tableau est vide');
        }

        return ventes;
    } catch (error) {
        throw new Error(error);
    }
}
}
module.exports = new VenteService();