/* Stockage de toute la logique métier avec le controller */

// Sequelize
const { Sequelize } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const Post = require('../models/Post')(sequelize, Sequelize);

// Import du package file system de node
const fs = require("fs");

/*** CRÉER UN POST ***/
exports.createPost = (req, res, next) => {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

  Post.create({
    userId: req.body.userId,
    message: req.body.message,
    imageUrl: imageUrl,
  })
    .then(() => res.status(201).json({ message: "post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

/*** AFFICHER UN POST ***/
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      attributes: {
        exclude: ["id", "password", "email", "createdAt", "updatedAt"],
      },
    },
  })
    .then((post) => {
      //si le post n'existe pas
      if (post === null) {
        return res.status(404).json({ message: "Ce post n'existe pas." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

/*** AFFICHER TOUS LES POSTS ***/
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ["id", "password", "email", "createdAt", "updatedAt"],
        }
      },
    })
  .then((posts) => res.status(200).json(posts))
  .catch((error) => res.status(400).json({ error }));
};

/*** SUPPRIMER UN POST ***/
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé !" });
      }

      const filename = post.imageUrl.split("/images/")[1];
      console.log(filename);

      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })

    .catch((error) => res.status(400).json({ error }));
};


