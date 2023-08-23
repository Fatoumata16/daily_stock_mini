const depense=require('../modeles/depense')
const sequelize = require('../configuration/sequelize_config');
const { Op } = require('sequelize');
class DepenseService {
    async creer(depenses,id_user,date_depense){
    const  {libelle,montant}=depenses;
    try {
      await depense.create({libelle,montant,date_depense,id_user})
    } catch (error) {
       throw error
    } }
    async  modifierDepense(id_depense, userr) {
        try {
          const res = await depense.findByPk(id_depense);
          if (res === null) {
            throw new Error('depense non trouvé');
          } else {
            const updatedUser = { libelle:userr.libelle };
            if (userr.montant !== undefined) {
              updatedUser.montant = userr.montant;
            }
            if (userr.date_depense !== undefined) {
              updatedUser.date_depense = new Date(userr.date_depense);
            }
            if (userr.id_user !== undefined) {
              updatedUser.id_user = userr.id_user;
            }
            return await depense.update(updatedUser, { where: { id_depense} });
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
    const tout= await depense.findAll({where:{id_user}})
    if(tout.length===0){
      throw new Error ('le tableau est vide')
    }
     return tout
    } catch (error) {
      throw new Error(error);
    }
  }
  async  getDepenseByDate(date,id_user) {
    try {
      const laDate=new Date(date)
      const appros = await depense.findAll({
        where:{date_depense:laDate,id_user:id_user}
      });
      return appros;
    } catch (error) {
      throw error;
    }
  }
  async  getMontantDepenseByDate(date,id_user) {
    try {
      const laDate = new Date(date);

      const depensesIndividuelles = await depense.findAll({
          attributes: ["libelle", "date_depense", "id_depense", "montant"],
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
      console.log(error)
      throw error;
    }
  }
}
module.exports = new DepenseService();