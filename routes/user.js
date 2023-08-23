const express = require('express')
const controlleur=require('../controlleur/user')
const auth=require('../authentification/authorization')
// const multerr=require('../multer/multer_config')
const route =express.Router();
route.post("/ajouter",controlleur.ajout)
route.post("/connecter",controlleur.connection)
route.put("/modifier",auth,controlleur.modifierParId)
route.delete("/supprimer",auth,controlleur.supprimerParId)
route.get("/listerUser",controlleur.lister)
  module.exports=route;