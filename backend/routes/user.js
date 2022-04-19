//- IMPORTS -//
const express = require('express'); // Express       
const router = express.Router(); //Router
const userCtrl = require('../controllers/user');// Controlleur User
//const multer = require("../middleware/multer-config"); // multer
const auth = require("../middleware/auth");//

//-->  ROUTES DE CONNEXIONS SIGNUP/LOGIN <--//
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//-->  ROUTES PROFIL UTILISATEURS <--//
router.get("/profile/:id", userCtrl.getOneUser); //afficher un profil


// Export du routeur
module.exports = router;