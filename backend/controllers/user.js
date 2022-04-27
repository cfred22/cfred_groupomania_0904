//- IMPORTS -//
const bcrypt = require('bcrypt'); // Bcrypt pour l'authentification
const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoke
// Sequelize
const { Sequelize } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const User = require('../models/User')(sequelize, Sequelize);
const fs = require("fs");


//-  INSCRIPTIONS UTILISATEURS  -//
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)  // hasher(10 tours) le mdp avec le bcrypt
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((User) =>
          res.status(201).json(User) // Utilsateur créé et sauvegardé !
        )
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });
    })
    .catch((oups) => {
      console.log(oups);
      res.status(500).json({ oups});
    });
};

//- CONNECTION UTILISATEURS DÉJA ENREGISTRÉS -//
exports.login = (req, res, next) => {
    User.findOne({ 
      where: { email: req.body.email },}) // trouver un utilisateur 
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // comparer le mdp et le hash 
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ // renvoie a l'utilisateur son user id et un token, que le front va envoyer avec chaque requêtes.
                userId: user.id,
                token: jwt.sign( // donnée à encoder dans le token.
                    { userId: user.id }, // correspondance a un user_id
                    'RANDOM_TOKEN_SECRET', // clé secrète pour l'encodage
                    { expiresIn: '24h' } // chaque token durera 24h, après il n'est plus valable
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
};

//- AFFICHER UN USER -//
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//- SUPPRIMER LE PROFIL D'UN UTILISATEUR -//
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted === 0)
        return res
          .status(404)
          .json({ message: "Cet utilisateur n'existe pas" });
      res.status(200).json({ message: "Utilisateur bien supprimé !" });
    })
    .catch((error) => res.status(500).json({ error: error }));
};