const express = require('express')
const controlleur=require('../controlleur/ligne_appro')
const auth=require('../authentification/authorization')
const route =express.Router();
route.post("/ajouter/:id/:ide",auth,controlleur.ajout)
route.put("/modifier/:id/:ide",controlleur.modifierParId)
route.delete("/supprimer/:id/:ide",controlleur.supprimerParId)
route.get("/listerLigneAppro",auth,controlleur.lister)
module.exports=route;