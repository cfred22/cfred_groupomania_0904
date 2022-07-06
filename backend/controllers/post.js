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
    active: 1,
  })
    .then((post) => res.status(201).json(post))
    .catch((error) => res.status(400).json({ error }));
};

/*** AFFICHER UN POST ***/
exports.getOnePost = (req, res, next) => {
  Post.findOne({ 
    where:{id: req.params.id},
    //include:[{model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']}, {model: Comments}]
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
}

/*** AFFICHER TOUS LES POSTS ***/
exports.getAllPosts = (req, res, next) => {
  var where = {};

  if(req.query.isAdmin){
    where = {
      include:[
        {model: User},
      ],
    }
  } else {
    where = {
      where: {
        active: 1
      },
      include:[
        {model: User}
      ]
    }
  }
  /*if (req.query.type == "text"){
    where = {
      where: {
         message: { [Op.not]: null || "" }, 
         active: 1
      },
      include:[
        {model: User}
      ]
    }
  } else if (req.query.type == "image"){
    where = {
      where: {
        imageUrl: { [Op.not]: null || "" },
        active: 1
      },
      include:[
        {model: User}
      ]
    }
  }*/
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

      User.findOne({ where: { id: req.auth.userId } })
        .then((user) => {
          if (user.isAdmin && req.auth.userId != post.userId) {
            return res
              .status(401)
              .json({ error: "Modification non autorisée !" });
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
        .catch((error) => res.status(400).json({ error }));
      
    })
    .catch(error => res.status(500).json({ error }));
};

/*** SUPPRIMER UN POST ***/

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé !" });
      }

      User.findOne({ where: { id: req.auth.userId } })
        .then((user) => {
          if (req.auth.userId != post.userId) {
            return res
              .status(401)
              .json({ error: "Suppression non autorisée !" });              
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
    })
    .catch((error) => res.status(400).json({ error }));
};

/*** LIKER UN POST ***/

exports.likePost = (req, res, next) => {
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
    Post.update({ ...postObject, id: req.params.id},{where: {id: req.params.id}})
      .then(() => {res.status(200).json({likes, usersLiked})})
      .catch((error) => {res.status(400).json({ error })});
})
  .catch((error) => {res.status(404).json({ error })});
};

/*** ACTIVER : DESACTIVER UN POST ***/

exports.activePost = (req, res) => {
  Post.findOne({ where: {id: req.params.id} })
  .then((post) => {
    if (!post) {
      return res.status(404).json({ error: "Post non trouvé !" });
    }
    
    User.findOne({ where: { id: req.auth.userId } })
        .then((user) => {
      if (!user.isAdmin) {
        return res
          .status(401)
          .json({ error: "Suppression non autorisée !" });              
      
      }
    let active = !post.active;
    console.log(post.active);
    
    postObject = {...post, active};
    console.log(postObject);
    Post.update({ ...postObject, id: req.params.id},{where: {id: req.params.id}})
    .then(() => {res.status(200).json({active})})
      .catch((error) => {res.status(400).json({ error })});
    })
    .catch((error) => res.status(400).json({ error }));
})
  .catch((error) => {res.status(404).json({ error })});
};




