const serviceStock=require('../services/stock')
exports.ajout= async(req,res,next) =>{
    const data=req.body
    try {
         await serviceStock.creer(data.quantite,req.params.id)
         res.status(200).json("stock creer avec succes")
    } catch (error) {
      res.status(500).json(error.message
        )
    }
}
exports.modifierParId = async(req, res, next) => {
    const id = req.params.id;
    let data = req.body; 
    try {
      await serviceStock.modifierStock(id,data)
      res.json("stock modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
        await serviceStock.supprimerParId(req.params.id)
       res.status(200).json({ message: 'stock supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceStock.lister(req.auth.userId)
   if(resultat.length!=0){
    res.status(200).json(resultat);

   }
   else{
    res.status(200).json("le tableau est vide");

   }
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }