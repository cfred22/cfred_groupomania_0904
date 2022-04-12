
// import express et création du routeur
const express = require('express');
const router = express.Router();

// Importation de Sauce.js 
const postCtrl = require('../controllers/post.controller.js');

// import authentification
const auth = require('../middleware/auth'); 

// import multer 
const multer = require('../middleware/multer-config'); 


// CRUD //
// Create, read, Update, delete //
// middleware post, put, delete, get, avec la fonction NEXT pour passer de l'un à l'autre
router.post('/', auth, multer, postCtrl.createPost); // authentification d'abord puis multer (fichier image) 
router.put('/:id', auth, multer,postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deleteSauce);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPost);

router.post('/:id/like', auth, postCtrl.likePost);


// Export du routeur 
module.exports = router;