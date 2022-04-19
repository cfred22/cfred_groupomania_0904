
//- IMPORTS -//
const express = require('express'); // Express routeur
const router = express.Router(); // Router
const postCtrl = require('../controllers/post'); // Post 
const auth = require('../middleware/auth'); // Authentification
const multer = require('../middleware/multer-config'); // Multer 

//- ROUTES DE POSTS CRUD -//
router.post("/", auth, multer, postCtrl.createPost); //Créer un post
//router.get(':id', auth, postCtrl.getOnePost); //afficher un post par son id

// Export du routeur 
module.exports = router;