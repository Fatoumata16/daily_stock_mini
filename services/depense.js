const depense=require('../modeles/depense')
const { Op } = require('sequelize');
class DepenseService {
    async creer(depenses,id_user,date_depense){
    const  {libelle,montant}=depenses;
    try {
      let id=0
      const ladepense= await depense.findOne({where:{id_user:id_user},  order: [['id_depense', 'DESC']],
      limit: 1})
      if(ladepense){
        id=ladepense.id+1
      }
      else{
        id=1
      }
      await depense.create({id,libelle,montant,date_depense,id_user})
    } catch (error) {
       throw error
    } }
    async  modifierDepense(id_depense, userr) {
        try {
          const res = await depense.findByPk(id_depense);
          if (res === null) {
            throw new Error('depense non trouvé');
          } else {
            const updatedDepense = { libelle:userr.libelle };
            if (userr.montant !== undefined) {
              updatedDepense.montant = userr.montant;
            }
            if (userr.date_depense !== undefined) {
              updatedDepense.date_depense = new Date(userr.date_depense);
            }
            if (userr.id_user !== undefined) {
              updatedDepense.id_user = userr.id_user;
            }
            return await depense.update(updatedDepense, { where: { id_depense} });
          }
        } catch (error) {
          throw new Error(error);
        }
      }
async supprimerParId(id_depense){
    try {
      const d=await depense.findByPk(id_depense)
      if(d){
        return await  depense.destroy({where:{id_depense}})
      }
      throw new Error("cette depense n'existe pas")

    } catch (error) {
      throw new Error(error)
    }
  }
  async lister(id_user) {
    try {
    const tout= await depense.findAll({
      attributes: ["libelle", "date_depense", "id", "montant"],
      where:{id_user}})
    if(tout.length===0){
      return 'le tableau est vide'
    }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }
  async  getDepenseByDate(dateDebut, dateFin,id_user) {
    try {
      let whereClause = {};
        if (dateDebut && dateFin) {
            whereClause = {
              date_depense: {
                    [Op.between]: [dateDebut, dateFin],
                },
            };
        } else if (dateDebut) {
            whereClause = {
              date_depense: dateDebut,
            }; }
        const depenses = await depense.findAll({
          attributes: ["libelle", "date_depense", "id", "montant"],
            where: { id_user: id_user,
              ...whereClause},
        });
        if (depenses.length === 0) {
           return 'Le tableau est vide';
        }
        return depenses;
    } catch (error) {
      throw error;
    }
  }
  async  getMontantDepenseByDate(date,id_user) {
    try {
      const laDate = new Date(date);

      const depensesIndividuelles = await depense.findAll({
          attributes: ["libelle", "date_depense", "id", "montant"],
          where: { date_depense: laDate,id_user:id_user }
      });

      const montantTotal = await depense.sum("montant", {
          where: { date_depense: laDate ,id_user:id_user }
      });
      return {
          depenses: depensesIndividuelles,
          total_montant: montantTotal || 0  
      };
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DepenseService();