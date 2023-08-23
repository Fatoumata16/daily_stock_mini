const express = require('express')
const controlleur=require('../controlleur/appro')
const auth=require('../authentification/authorization')
const route =express.Router();
route.post("/ajouter",auth,controlleur.ajout)
route.put("/modifier/:id",auth,controlleur.modifierParId)
route.delete("/supprimer/:id",auth,controlleur.supprimerParId)
route.get("/listerAppro",auth,controlleur.lister)
route.get("/montantTotalApproByDateInterval",auth,controlleur.montantTotalApproByDateInterval)
route.get("/getApproByDate",auth,controlleur.getApproByDate)
route.get("/getLastAppro",auth,controlleur.getLastAppro)
route.get("/montantTotalAppro/:id",auth,controlleur.montantTotalAppro)
route.get("/listerApproByIntervalle",auth,controlleur.listerApproByIntervalle)
route.get("/montantTotalApproParUser",auth,controlleur.montantTotalApproParUser)
  module.exports=route;    
  