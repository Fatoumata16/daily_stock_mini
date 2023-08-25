const { DATE } = require('sequelize');
const appro=require('../modeles/appro')
const produit=require('../modeles/produit')
const sequelize = require('../configuration/sequelize_config');
const { Op } = require('sequelize');
class ApproService {
    async creer(date_appro,id_user){
    try {   
      let id=0
      const appros= await appro.findOne({where:{id_user:id_user},  order: [['id_appro', 'DESC']],
      limit: 1})
      if(appros){
        id=appros.id+1
      }
      else{
        id=1
      }   
      await appro.create({id,date_appro,id_user})
    } catch (error) {
       throw error }
    }
    async  modifierApppro(id_appro, appros) {
        try {
          const resultat = await appro.findByPk(id_appro);
          if (resultat === null) {
            throw new Error('appro non trouvé');
          } else {
            const updatedUser = {id_user:appros.id_user};
            if (appros.date_appro  !== undefined) {
              updatedUser.date_appro=new Date(appros.date_appro);
            }
         return await appro.update(updatedUser, { where: {id_appro} });
          }
        } catch (error) {
          throw new Error(error);
        }
      }
async supprimerParId(id_appro){
    try {
      const resultat=await appro.findByPk(id_appro)
      if(resultat){
        return await  appro.destroy({where:{id_appro}})
      }
      throw new Error("ce appro n'existe pas")
    } catch (error) {
      throw new Error(error)
    }
  }
  async lister(id_user) {
    try {
    const tout= await appro.findAll({
      attributes: [
        "id",
        "date_appro",
        "id_user"
         ],
      
      where:{id_user}})
    if(tout.length===0){
      return "le tableau est vide"
    }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }

async  getLastAppro(id_user) {
  try {
    const lastAppro = await appro.findOne({
      
      where:{id_user:id_user},
      order: [['id_appro', 'DESC']],
      limit: 1
    });
    return lastAppro;
  } catch (error) {
    throw error; }}


async  montantTotalAppro(id_appro,id_user) {
  try {
    const totalAmountResult = await appro.findAll({
      attributes: ["id_appro","id",
        [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
        [sequelize.fn('SUM', sequelize.col('produits.prix_achat')), 'total'], ],
      include: [ {
          model: produit,
          attributes: [ 
        ], }, ],
        where:{id_appro:id_appro,id_user:id_user},
      group: ['appro.id_appro'],
      raw: true,      });
    if (!totalAmountResult) {
      throw new Error('Approvisionnement non trouvé.'); }
    return totalAmountResult.map(appro => ({
      id_appro: appro.id,
      total_produit: appro.total,
      total_quantite: appro.total_amount,
      total_approvisionnement:appro.total_amount * appro.total,
    })); } catch (error) {
    throw new Error(error);}}

    async montantTotalApproByDateInterval(dateDebut, dateFin,id_user) {
      const startDate=new Date(dateDebut)
      const endDate=new Date(dateFin)
      try {
        const totalAmountResult = await appro.findAll({
          attributes: [
            "id_appro","id",
            [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
            [sequelize.fn('SUM', sequelize.col('produits.prix_achat')), 'total'], ],
          include: [ {
              model: produit,
              attributes: ["prix_achat"],}, ],
          where: {
            id_user:id_user,
            date_appro: {
              [Op.between]: [startDate, endDate],   },  },
          group: ['appro.id_appro'],
          raw: true,
        }); return totalAmountResult.map(approvisionnement => ({
          id_appro: approvisionnement.id,
          total_produit: approvisionnement.total, 
          total_quantite: approvisionnement.total_amount,
          total_montant_appro: approvisionnement.total_amount * approvisionnement.total,
        }));} catch (error) {
          throw new Error(error); } }


          async  montantTotalApproParUser(id_user) {
            try {
              const totalAmountResult = await appro.findAll({
                attributes: ["id_appro","id",
                  [sequelize.fn('SUM', sequelize.col('quantite')), 'total_amount'],
                  [sequelize.fn('SUM', sequelize.col('produits.prix_achat')), 'total'], ],
                include: [ {
                    model: produit,
                    attributes: [ "prix_achat"
                  ], }, ],
                  where:{id_user:id_user},
                group: ['appro.id_appro'],
                raw: true,      });
              if (!totalAmountResult) {
                throw new Error('Approvisionnement non trouvé.'); }
              return totalAmountResult.map(appro => ({
                id_appro: appro.id,
                total_produit: appro.total,
                total_quantite: appro.total_amount,
                total_approvisionnement:appro.total_amount * appro.total,
              })); } catch (error) {
              throw new Error(error);}}

              async listerApproByDate(dateDebut, dateFin,id_user) {
                try {
                    let whereClause = {};
                    if (dateDebut && dateFin) {
                        whereClause = {
                          date_appro: {
                                [Op.between]: [dateDebut, dateFin],
                            },
                        };
                    } else if (dateDebut) {
                        whereClause = {
                          date_appro: dateDebut,
                        };
                    }
                    const appros = await appro.findAll({
                      attributes: [
                        "id",
                        "date_appro",
                        "id_user"
                         ],
                        where: { id_user: id_user,
                          ...whereClause},
                        include: [ {
                          model: produit,
                          attributes: [ "id","libelle"
                        ], }, ],
                    });
            
                    if (appros.length === 0) {
                        throw new Error('Le tableau est vide');
                    }
            
                    return appros;
                } catch (error) {
                    throw new Error(error);
                }
            }
            
}
module.exports = new ApproService();









