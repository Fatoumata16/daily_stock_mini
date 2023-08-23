const express = require('express')
const controlleur=require('../controlleur/ligne_vente')
const auth=require('../authentification/authorization')

// const auth=require('../authentification/auth')
// const multerr=require('../multer/multer_config')
const route =express.Router();
route.post("/ajouter/:id/:ide",auth,controlleur.ajout)
route.put("/modifier/:id/:ide",controlleur.modifierParId)
route.delete("/supprimer/:id/:ide",controlleur.supprimerParId)
route.get("/listerLigneVente",auth,controlleur.lister)
route.get("/TrouverLigneVenteParIdVente/:id",controlleur.TrouverLigneVenteParIdVente)
  module.exports=route;