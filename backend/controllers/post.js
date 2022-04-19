
//- IMPORTS -/
const Post = require("../models/post");
const User = require("../models/User");
const fs = require("fs");

// -----MIDDLEWARE pour créer un post ------------
exports.createPost = (req, res, next) => {
    // TODO SI IMAGE 
    Post.create({
        title: req.body.title,
        userId: req.body.userId,
        description: req.body.description,
        imageUrl: imageUrl,
      })
        .then((Post) =>
          res.status(201).json({ message: "Création enregistrée!" })
        )
        .catch((error) => res.status(400).json({ error }));
    
};

//- MIDDLEWARE pour afficher tous les posts -//
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ["id", "password", "email", "createdAt", "updatedAt"],
        }
      },
    })
      .then((post) =>res.status(200).json(post))
      .catch((error) => res.status(404).json({ error }));
  };