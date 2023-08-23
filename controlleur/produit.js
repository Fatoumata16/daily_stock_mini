const serviceProduit=require('../services/produit')

exports.ajout= async(req,res,next) =>{
    try {
        let imageUrl="http://localhost:3000/images/openfarm3.jpg1689081448327.jpg"
        const data= JSON.parse(req.body.produit);
        if(req.file){  
             imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    await  serviceProduit.creer(data,imageUrl,req.auth.userId)
          res.status(200).json({ message: 'produit créé avec succès' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
exports.modifierParId = async(req, res, next) => {
  const id = req.params.id;
  let data = req.body; 
  let imageUrl = ""; 
  try {
  if (req.file) {
    
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    data=JSON.parse(req.body.produit)
  }
    
      await serviceProduit.modifierProduit(id,data,imageUrl)
    res.json("produit modifier avec succes")
    } catch (error) {
      res.status(500).json(error.message)
    }
  };
  exports.supprimerParId=async(req,res,next) =>{
    try {
     await serviceProduit.supprimerParId(req.params.id)
             res.status(200).json({ message: 'produit supprimee avec succès' });
    } catch (error) {
     res.json(error.message)
    }
}
exports.lister=async(req,res,next) =>{
  try {
 const resultat=  await serviceProduit.lister(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
exports.listeralertstock=async(req,res,next) =>{
  try {
 const resultat=  await serviceProduit.getProductsInStockAlert(req.auth.userId)
 
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }}
  exports.leProduitLePlusApprovisionner=async(req,res,next) =>{
    try {
   const resultat=  await serviceProduit.leProduitLePlusApprovisionner(req.auth.userId)
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }}
    exports.leProduitLePlusVendu=async(req,res,next) =>{
      try {
     const resultat=  await serviceProduit.leProduitLePlusVendu(req.auth.userId)
     
       res.status(200).json(resultat);
      } catch (error) {
       res.status(500).json({ error: error.message });
      }}
exports.trouverParLibelle=async(req,res,next) =>{
  try {
 const resultat=  await serviceProduit.trouverParLibelle(req.params.libelle,req.auth.userId)
   res.status(200).json(resultat);
  } catch (error) {
   res.status(500).json({ error: error.message });
  }
}
// exports.getProductsInStockAlert=async(req,res,next) =>{
//   try {
//  const resultat=  await serviceProduit.getProductsInStockAlert()
 
//    res.status(200).json(resultat);
//   } catch (error) {
//    res.status(500).json({ error: error.message });
//   }
// }
     
    
