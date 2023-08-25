const serviceLigneAppro=require('../services/ligne_appro')
exports.ajout= async(req,res,next) =>{
    try {
         await serviceLigneAppro.creer(req.params.id,req.params.ide,req.body.quantite,req.auth.userId)
         res.status(200).json("produit ajoute a l'appro reussi")
    } catch (error) {
      res.status(500).json(error.message
        )
    }
}
exports.modifierParId = async(req, res, next) => {
    try {
     await serviceLigneAppro.creerOuModifier(req.params.id,req.params.ide,req.body.quantite)
      res.json("ligne appro modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
         await serviceLigneAppro.supprimer(req.params.id,req.params.ide)
                 res.status(200).json({ message: 'ligne appro supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceLigneAppro.listeLigneAppro(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }
 exports.trouverLigneApproParIdVente=async(req,res,next) =>{
  try {
 const resultat=  await serviceLigneAppro.trouverLigneApproParIdVente(req.params.id)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}