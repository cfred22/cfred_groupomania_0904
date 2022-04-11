const express = require('express');

// Création d'une appli express
const app = express();

// Import path qui donne accès au chemin systeme de fichier 
const path = require('path');

// import sequelize
/*const { sequelize } = require('./models');*/

/*app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});*/

/*sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)

});*/



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


module.exports = app;