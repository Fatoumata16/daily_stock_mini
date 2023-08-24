const express = require('express');
const  routeuser=require('./routes/user')
const routeproduit=require('./routes/produit')
const routeappro=require('./routes/appro')
const routedepense=require('./routes/depense')
const routeligne_appro=require('./routes/ligne_appro')
const routeligne_vente=require('./routes/ligne_vente')
const routestock=require('./routes/stock')
const routevente=require('./routes/vente')
const path = require('path');
// const myconnection = require('express-myconnection');

// création d'une constante qui sera notre application express
const app = express();
// définition du middleware pour la connexion à la bd
// app.use(myconnection(mysql, optionbd, 'pool'));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Servir les images depuis le dossier externe
const imagesAbsolutePath = 'C:/Users/Fatoumata DEMBELE/Desktop/images'; // Chemin absolu vers le dossier externe
app.use('/images', express.static(imagesAbsolutePath));
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/user",routeuser)
app.use("/produit",routeproduit)
app.use("/vente",routevente)
app.use("/depense",routedepense)
app.use("/stock",routestock)
app.use("/appro",routeappro)
app.use("/ligne_vente",routeligne_vente)
app.use("/ligne_appro",routeligne_appro)
// on dit sur quel port notre appli va tourner
app.set('port', 3000);
// création d'un serveur avec une fonction qui sera exécutée à chaque requête
const server = app.listen(app.get('port'), () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${app.get('port')}`);
});
