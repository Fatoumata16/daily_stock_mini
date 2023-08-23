const express = require('express')
const controlleur=require('../controlleur/produit')
const auth=require('../authentification/authorization')
const multerr=require('../multer/multer_config')
const route =express.Router();
route.post("/ajouter",auth,multerr,controlleur.ajout)
route.put("/modifier/:id",auth,multerr,controlleur.modifierParId)
route.delete("/supprimer/:id",auth,controlleur.supprimerParId)
route.get("/listerProduit",auth,controlleur.lister)
route.get("/listeralertstock",auth,controlleur.listeralertstock)
route.get("/leProduitLePlusApprovisionner",auth,controlleur.leProduitLePlusApprovisionner)
route.get("/leProduitLePlusVendu",auth,controlleur.leProduitLePlusVendu)
route.get("/trouverParLibelle/:libelle",auth,controlleur.trouverParLibelle)
  module.exports=route;