const express = require('express')
const controlleur=require('../controlleur/vente')
const auth=require('../authentification/authorization')
const route =express.Router();
route.post("/ajouter",auth,controlleur.ajout)
route.put("/modifier/:id",auth,controlleur.modifierParId)
route.delete("/supprimer/:id",auth,controlleur.supprimerParId)
route.get("/listerVente",auth,controlleur.lister)
route.get("/montantTotalVente/:id",auth,controlleur.montantTotalVente)
route.get("/montantTotalVenteByDateInterval",auth,controlleur.montantTotalVenteByDateInterval)
route.get("/montantTotalVenteParUser",auth,controlleur.montantTotalVenteParUser)
route.get("/derniereVente",auth,controlleur.derniereVente)
route.get("/listerVenteParDate",auth,controlleur.VenteParDate)
module.exports=route;