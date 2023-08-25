const express = require('express')
const controlleur=require('../controlleur/ligne_vente')
const auth=require('../authentification/authorization')
const route =express.Router();
route.post("/ajouter/:id/:ide",auth,controlleur.ajout)
route.put("/modifier/:id/:ide",auth,controlleur.modifierParId)
route.delete("/supprimer/:id/:ide",auth,controlleur.supprimerParId)
route.get("/listerLigneVente",auth,controlleur.lister)
route.get("/TrouverLigneVenteParIdVente/:id",controlleur.TrouverLigneVenteParIdVente)
  module.exports=route;