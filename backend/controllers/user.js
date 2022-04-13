// import de bcrypt pour l'authentification
const bcrypt = require('bcrypt');

// import de JWT
const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken

// Import du model user
const User = require('../models/User');

//-->  INSCRIPTIONS UTILISATEURS  <--//
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)  // hasher(10 tours) le mdp avec le bcrypt
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((User) =>
          res.status(201).json({ message: "Utilisateur créé et sauvegardé !" })
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







/*
// Permet aux utilisateurs existants de se connecter
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // trouver un utilisateur 
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
                userId: user._id,
                token: jwt.sign( // donnée à encoder dans le token.
                    { userId: user._id }, // correspondance a un user_id
                    'RANDOM_TOKEN_SECRET', // clé secrète pour l'encodage
                    { expiresIn: '24h' } // chaque token durera 24h, après il n'est plus valable
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
};*/