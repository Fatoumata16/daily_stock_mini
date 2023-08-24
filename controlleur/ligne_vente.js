const serviceLigneVente=require('../services/ligne_vente')
exports.ajout= async(req,res,next) =>{
    try {
     
         await serviceLigneVente.creer(req.params.id,req.params.ide,req.body.quantite,req.auth.userId)
         res.status(200).json("compte creer avec succes")
    } catch (error) {
      res.status(500).json(error.message
        )
    }
}
exports.modifierParId = async(req, res, next) => {
    
    try {
     await serviceLigneVente.creerOuModifier(req.params.id,req.params.ide,req.body.quantite)
      res.json("ligne appro modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
         await serviceLigneVente.supprimer(req.params.id,req.params.ide)
                 res.status(200).json({ message: 'ligne appro supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceLigneVente.listeLigneVente(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }
 exports.TrouverLigneVenteParIdVente=async(req,res,next) =>{
  try {
 const resultat=  await serviceLigneVente.TrouverLigneVenteParIdVente(req.params.id)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}