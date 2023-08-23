const express = require('express')
const controlleur=require('../controlleur/stock')
// const auth=require('../authentification/auth')
// const multerr=require('../multer/multer_config')
const route =express.Router();
route.post("/ajouter/:id",controlleur.ajout)
route.put("/modifier/:id",controlleur.modifierParId)
route.delete("/supprimer/:id",controlleur.supprimerParId)
route.get("/listerStock",controlleur.lister)
  module.exports=route;