/* Stockage de toute la logique métier avec le controller */

// Sequelize
const { Sequelize, where } = require("sequelize"); 
const sequelize = require("../config/database/connect")(Sequelize);
const Post = require('../models/Post')(sequelize, Sequelize);
const User = require('../models/User')(sequelize, Sequelize);

User.hasMany(Post);
Post.belongsTo(User, {foreignKey: "userId"});


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
  var where = {
      include:[
        {model: User}
      ]
  };
  if (req.query.type == "text"){
    where = {
      where: {
         message: { [Op.not]: null || "" }
      },
      include:[
        {model: User}
      ]
    }
  } else if (req.query.type == "image"){
    where = {
      where: {
        imageUrl: { [Op.not]: null || "" }
      },
      include:[
        {model: User}
      ]
    }
  }
  Post.findAll(where)
  .then((posts) => res.status(200).json(posts))
  .catch((error) => res.status(400).json({ error }));
};

/*** MODIFIER UN POST ***/
exports.modifyPost = (req, res, next) => {
  
  const postObject = req.file ?
  {
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  

  Post.findOne({ where: {id: req.params.id}})
    .then(post => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé !" });
      }
      if(post.imageUrl != null) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/$ {filename}`, () => {
          Post.update({ ...postObject, id:  req.params.id},{where: {id: req.params.id}})
            .then((post) => res.status(200).json({ post}))
            .catch(error => res.status(400).json({ error }));
        })
      } else {
        Post.update({ ...post, id:  req.params.id},{where: {id: req.params.id}})
          .then((post) => res.status(200).json({post}))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

/*** SUPPRIMER UN POST ***/

exports.deletePost = (req, res,next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé !" });
      }

      const filename = post.imageUrl.split("/images/")[1];
      console.log(filename);

      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(204).json(post.id))
          .catch((error) => res.status(400).json({ error }));
      });
    })

    .catch((error) => res.status(400).json({ error }));
};

/*exports.likePost = (req, res, next) => {
  Post.findOne({ where: {id: req.params.id} })
  .then((post) => {
    let likes = post.likes;
    let usersLiked = post.usersLiked;
    let userId = req.body.userIdLike;
    if (usersLiked) {
      const found = usersLiked.find(p => p == userId);
      if (found) {
        likes--;
        let userKey = usersLiked.indexOf(userId);
        usersLiked.splice(userKey, 1);
      }
      else{
        likes++;
        usersLiked.push(req.body.userIdLike);
      }
      postObject = {...post, likes, usersLiked}
    }
    else {
      usersLiked = [];
      likes++;
      usersLiked.push(req.body.userIdLike);
      postObject = {...post, likes, usersLiked}
    }
  })
};*/




