/* Stockage de toute la logique métier avec le controller */


// Sequelize
const { Sequelize } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const Post = require('../models/Post')(sequelize, Sequelize);

// Import du package file system de node
const fs = require("fs");

/*** CRÉER UN POST ***/
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post); // extraire sauce json de sauce.js

  Post.create({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })
    .then(() => res.status(201).json({ message: "post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

/*** SUPPRIMER UN POST ***/
exports.deletePost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then(
      // trouver le nom du fichier à supprimer
      (post) => {
        const filename = post.imageUrl.split("/images/")[1]; // récupérer et extraire le nom du fichier à suuprimer
        fs.unlink(`images/${filename}`, () => {
          // suppression avec unlink
          Post.deleteOne({ id: req.params.id }) // suppression complète dans la base
            .then(() => res.status(200).json({ message: "Post supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    )
    .catch((error) => res.status(500).json({ error }));
};


/*** AFFICHER TOUS LES POSTES ***/
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