const serviceDepense=require('../services/depense')
exports.ajout= async(req,res,next) =>{
    const data=req.body
    try {
      
         await serviceDepense.creer(data,req.auth.userId,new Date())
         res.status(200).json("depense creer avec succes")
    } catch (error) {
      res.status(500).json(error.message
        )
    }
}
exports.modifierParId = async(req, res, next) => {
    const id = req.params.id;
    let data = req.body; 
    try {
      await serviceDepense.modifierDepense(id,data)
      res.json("depense modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
        await serviceDepense.supprimerParId(req.params.id)
        res.status(200).json({ message: 'depense supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceDepense.lister(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }
 exports.getDepenseByDate=async(req,res,next) =>{
  try {
 const resultat=  await serviceDepense.getDepenseByDate(req.body.date,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.getMontantDepenseByDate=async(req,res,next) =>{
  try {
 const resultat=  await serviceDepense.getMontantDepenseByDate(req.body.date,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}