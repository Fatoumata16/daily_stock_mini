const serviceUser=require('../services/user')
const jwt=require('jsonwebtoken')
exports.ajout= async(req,res,next) =>{
    const data=req.body
    try {
         await serviceUser.creer(data)
         res.status(200).json("compte creer avec succes")
    } catch (error) {
      res.status(500).json(error.message
        )
    }
}
exports.connection = async (req, res, next) => {
  const data = req.body;
  try {
    const resultat = await serviceUser.connecter(data.telephone,data.pass);
    res.status(200).json({
      userId: resultat.id_user,
      token: jwt.sign(
        {
          userId: resultat.id_user,
        },
        'RAMDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      ),
    });
  } catch (error) {
      res.status(500).json(error.message);

  }
};
exports.modifierParId = async(req, res, next) => {
    const id = req.auth.userId;
    let data = req.body; 
    try {
        await serviceUser.modifierUser(id,data)
      res.json("user modifier avec succes")
      } catch (error) {
        res.json(error)
      }
    };
    exports.supprimerParId=async(req,res,next) =>{
        try {
         await serviceUser.supprimerParId(req.auth.userId)
                 res.status(200).json({ message: 'User supprimee avec succès' });
        } catch (error) {
         res.json(error.message)
        }
   }
   exports.lister=async(req,res,next) =>{
    try {
   const resultat=  await serviceUser.lister()
   
     res.status(200).json(resultat);
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
 }