// import express et création du routeur
const express = require('express');
const router = express.Router();

// Importation de post.js 
const postCtrl = require('../controllers/post');

// import authentification
const auth = require('../middleware/auth'); 

// import multer 
const multer = require('../middleware/multer-config'); 

// CRUD //
// Create, read, Update, delete //
router.post('/', auth, multer, postCtrl.createPost); // authentification d'abord puis multer (fichier image) 
router.delete('/:id', auth, postCtrl.deletePost); // Supprimer un post
router.get('/', auth, postCtrl.getAllPosts); //afficher tous les postes
router.put('/:id', multer, postCtrl.modifyPost);

//router.get('/:id', auth, postCtrl.getOnePost);
//router.post('/:id/like', auth, postCtrl.likePost);



// Export du routeur 
module.exports = router;