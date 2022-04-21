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
// middleware post, put, delete, get, avec la fonction NEXT pour passer de l'un à l'autre
router.post('/', multer, postCtrl.createPost); // authentification d'abord puis multer (fichier image) 
router.delete('/:id', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);

//router.post('/:id/like', auth, postCtrl.likePost);


// Export du routeur 
module.exports = router;