// Import et création de express
const express = require('express');
const app = express();

// Import path qui donne accès au chemin systeme de fichier 
const path = require('path');

const { Sequelize } = require("sequelize");
const sequelize = require("./config/database/connect")(Sequelize);


// test DB
try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }

// Import du routes/user
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


//Middleware pour résoudre les problemes de CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet d'accéder a l'api depuis n'importe quelle origine.
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // permet d'ajouter des headers.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // permet de get, post, etc..
    next();
});

// Middleware intercepte toutes les requêtes avec content type json,
// et met leur body directement sur l'objet req
app.use(express.json());



// Enregistrer les routes 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes); 
app.use('/api/post', postRoutes);

require("./config/database/build")(sequelize, Sequelize);

// Module qui permet d'exporter l'appli express
module.exports = app;

