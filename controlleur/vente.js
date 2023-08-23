const serviceVente=require('../services/vente')
exports.ajout= async(req,res,next) =>{
    try {
         await serviceVente.creer(new Date(),req.auth.userId)
         res.status(200).json("vente creer avec succes")
    } catch (error) {
      res.status(500).json(error.message)
    }
}
exports.modifierParId = async(req, res, next) => {
    const id = req.params.id;
    let data = req.body; 
    try {
        await serviceVente.modifierUser(id,data)
      res.json("vente modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
         const resultat=await serviceVente.supprimerparid(req.params.id)
                 res.status(200).json({ message: 'vente supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceVente.lister(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }
 exports.derniereVente=async(req,res,next) =>{
  try {
 const resultat=  await serviceVente.getLastVente(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.VenteParDate=async(req,res,next) =>{
  try {
 const resultat=  await serviceVente.getVenteByDate(req.body.date,req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalVente=async(req,res,next) =>{
  try {
 const resultat=  await serviceVente.montantTotalVente(req.params.id,req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalVenteByDateInterval=async(req,res,next) =>{
  try {
 const resultat=  await serviceVente.montantTotalVenteByDateInterval(req.body.date1,req.body.date2,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.montantTotalVenteParUser=async(req,res,next) =>{
  try {
 const resultat=  await serviceVente.montantTotalVenteParUser(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}