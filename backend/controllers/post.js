/* Stockage de toute la logique métier avec le controller */

// Sequelize
const { Sequelize, where } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const Post = require('../models/Post')(sequelize, Sequelize);
const User = require('../models/User')(sequelize, Sequelize);

// Import du package file system de node
const fs = require("fs");
const Op = require ("sequelize").Op;

/*** CRÉER UN POST ***/
exports.createPost = (req, res, next) => {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename }`;
    }

  Post.create({
    userId: req.auth.userId,
    message: req.body.message,
    imageUrl: imageUrl,
  })
    .then((post) => res.status(201).json(post))
    .catch((error) => res.status(400).json({ error }));
};

/*** AFFICHER TOUS LES POSTS ***/
exports.getAllPosts = (req, res, next) => {
  var where = {};
  if (req.query.type == "text"){
    where = {
      where: {
         message: { [Op.not]: null || "" }
      }
    }
  } else if (req.query.type == "image"){
    where = {
      where: {
        imageUrl: { [Op.not]: null || "" }
      }
    }
  }
  Post.findAll(where)
  .then((posts) => res.status(200).json(posts))
  .catch((error) => res.status(400).json({ error }));
};

/*** SUPPRIMER UN POST ***/
exports.deletePost = (req, res,) => {
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


