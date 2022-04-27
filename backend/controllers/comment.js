
// Sequelize
const { Sequelize } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const Post = require('../models/Post')(sequelize, Sequelize);
const User = require('../models/User')(sequelize, Sequelize);
const Comment = require('../models/Comment')(sequelize, Sequelize);


//*- CRÉER UN COMMENTAIRE *-//
exports.createComment = (req, res, next) => {
    Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        text: req.body.text        
    })
        .then(() => res.status(201).json({ msg: 'Commentaire créé !'}))
        .catch(error => res.status(400).json({ error }));
};

//*- RÉCUPÉRER TOUS LES COMMENTAIRES D'UN POST *-//
exports.getAllCommentsByPost = (req, res, next) => {
    Comment.findAll({
      include: {       //j'inclus le role de mon utilisateur
        model: User,
        attributes: {    // en excluant id, password etc ...
          exclude: ["id", "password", "email", "createdAt", "updatedAt"],
        },
      },
      order: [["createdAt", "DESC"]],    // Spécifie un ordre descendant des createAt
    })
      .then((comment) => res.status(200).json(comment))
      .catch((error) => res.status(404).json({ error }));
};

//*- SUPPRIMER UN COMMENTAIRE  *-//
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({ error: "Commentaire non trouvé !" });
        }
  
        Comment.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Commentaire supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      })
  
      .catch((error) => res.status(400).json({ error }));
};


