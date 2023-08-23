const user=require('../modeles/user')
const bcrypt=require('bcrypt')

class UserService {
    async creer(userr){
    const  {login,nom_boutique,pass,type_boutique,adresse,telephone}=userr;
    try {
   const u=  await user.findOne({where:{telephone}})
   if(u){
    throw new Error("ce user existe deja")
   }
   else{
      let hashe = await bcrypt.hash(pass,10);
      await user.create({login,pass:hashe,nom_boutique,type_boutique,adresse,telephone})}
    } catch (error) {
       throw new Error(error)
    }
    }
    async connecter(tel, password) {
      try {
        const resultat = await user.findOne({ where: { telephone: tel } });
        if (!resultat) {
          throw new Error('utilisateur non trouve');
        } else {
          const result= await   bcrypt.compare(password,resultat.pass)
          if (!result) {
            // return resultat;
            throw new Error('mot de passe incorrect');
          } else {
            return resultat;
          }
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
    async  modifierUser(id_user, userr) {
        try {
          const res = await user.findByPk(id_user);
          if (res === null) {
            throw new Error('utilisateur non trouvé');
          } else {
            const updatedUser = { login:userr.login }; // Initialiser avec les attributs à mettre à jour
      
            if (userr.nom_boutique !== undefined) {
              updatedUser.numero = userr.numero;
            }
            if (userr.pass !== undefined) {
              const passe = await bcrypt.hash(userr.pass, 10);
              updatedUser.pass = passe;
            }
            if (userr.type_boutique !== undefined) {
              updatedUser.type_boutique = userr.type_boutique;
            }
      
            if (userr.adresse !== undefined) {
              updatedUser.adresse = userr.adresse;
            }
      
            if (userr.telephone !== undefined) {
              updatedUser.telephone = userr.telephone;
            }
            return await user.update(updatedUser, { where: { id_user} });
          }
        } catch (error) {
          console.log(error)
          throw new Error(error);
        }
      }
async supprimerParId(id_user){
    try {
    const u=  await user.findByPk(id_user)
    if(u){
      return await  user.destroy({where:{id_user}})
    }
    throw new Error("utilisateur introuvable")
    } catch (error) {
      throw new Error(error)
    }
  }
  async lister() {
    try {
    const tout= await user.findAll()
    if(tout.length===0){
      throw new Error ('le tableau est vide')
    }
     return tout
    } catch (error) {
      throw new Error(error);

    }
  }
}
module.exports = new UserService();









