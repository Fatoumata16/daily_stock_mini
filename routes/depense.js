const express = require('express')
const controlleur=require('../controlleur/depense')
const auth=require('../authentification/authorization')
const route =express.Router();
route.post("/ajouter",auth,controlleur.ajout)
route.put("/modifier/:id",auth,controlleur.modifierParId)
route.delete("/supprimer/:id",auth,controlleur.supprimerParId)
route.get("/listerDepense",auth,controlleur.lister)
route.get("/getDepenseByDate",auth,controlleur.getDepenseByDate)
route.get("/getMontantDepenseByDate",auth,controlleur.getMontantDepenseByDate)
  module.exports=route;