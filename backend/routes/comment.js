// import express et création du routeur
const express = require('express');
const router = express.Router();

// import authentification
const auth = require('../middleware/auth'); 

// import multer 
const multer = require('../middleware/multer-config'); 

// Importation de comment.js 
const commentCtrl = require('../controllers/comment');

//-->  ROUTES PROFIL UTILISATEURS <--// 
router.post('/', auth, multer, commentCtrl.createComment);
router.get('/', auth, commentCtrl.getAllCommentsByPost); //afficher tous commentaires
router.delete('/:id', auth, commentCtrl.deleteComment); //supprimer un commentaire


// Export du routeur 
module.exports = router;
