const serviceAppro=require('../services/appro')
exports.ajout= async(req,res,next) =>{
    try {
         await serviceAppro.creer(new Date(),req.auth.userId)
         res.status(200).json("appro creer avec succes")
    } catch (error) {
      res.status(500).json(error.message)
    }
}
exports.modifierParId = async(req, res, next) => {
    const id = req.params.id;
    let data = req.body; 
    try {
        await serviceAppro.modifierApppro(id,data)
      res.json("appro modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
       await serviceAppro.supprimerParId(req.params.id)
                 res.status(200).json({ message: 'appro supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceAppro.lister(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }
 exports.getApproByDate=async(req,res,next) =>{
  try {
 const resultat=  await serviceAppro.getApproByDate(req.body.date,req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.getLastAppro=async(req,res,next) =>{
  try {
 const resultat=  await serviceAppro.getLastAppro(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalAppro=async(req,res,next) =>{
  try {
 const resultat=  await serviceAppro.montantTotalAppro(req.params.id,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalApproByDateInterval=async(req,res,next) =>{
  try {
 const resultat=  await serviceAppro.montantTotalApproByDateInterval(req.body.date1,req.body.date2,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalApproParUser=async(req,res,next) =>{
  try {
 const resultat=  await serviceAppro.montantTotalApproParUser(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.listerApproByIntervalle=async(req,res,next) =>{
  try {
      const { dateDebut, dateFin } = req.body;

      const appros = await serviceAppro.listerApproByIntervalle(dateDebut, dateFin,req.auth.userId);
      res.json(appros);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}