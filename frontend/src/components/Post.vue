<template>
  <div class="card-text" v-if="post.message!=='null'">
    <div class="card-userName">
      <p class="userName"> ☺︎ {{user.firstName}} {{user.lastName}} </p>
      <p class="date-time"> Publié le {{ new Date(post.createdAt).toLocaleString() }}</p>
    </div>

    <div class="card-file">
      <img class="cover" v-if="post.imageUrl" :src="post.imageUrl"  alt="Image" height="250" width="300"/>
      <img v-else />
    </div>

    <div class="card-messageTxt">
      <p class="message">{{post.message}}</p>
    </div>
 
    <div id="app">
        
      <div class="menu">  
        <button class="deletePost" v-if="post.userId === userId" type="button" @click="deletePost()"> Supprimer Post
        
        </button>
        <button class="modifPost" type="button" @click="modify()"> Modifier Post
        </button>
      </div>
      

      <!-- <div class="menu-like" >
        <button
          class="like post-change"
          
          type="button"
          @click="like('like');"
          >👍
        </button>
        
      </div> -->
      
   <!-- <div class="like">
       <div v-if="(this.userLike == true)" >
        <button class="buttonLike blue">{{this.post.likes}}<fa @click="addLike()"  icon="thumbs-up" class="thumbs up"/></button>
      </div>
      <div v-else >
        <button class="buttonLike thumbsgrey">{{this.post.likes}}<fa @click="addLike()" icon="thumbs-up" class="thumbs up"/></button>
      </div>
      </div> -->
    </div>
  </div> 
  
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';


export default {
  name: 'CreatePost',
  components: {},
  data() {
    return {
      userId: this.post.userId, 
      currentUserId: "",
      user: {
        firstName: "",
        lastName: ""
      }
    };
  },
   computed: {
    validatedFields: function () {
      if (this.post == 'createPost') {
        if (this.post != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.post == "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status', 'user'])
  },
  mounted() {
    var storage = JSON.parse(localStorage.getItem("user"));
    var token = storage.token;

    axios.get("http://localhost:3000/api/auth/profile/" + this.userId, {
    headers: {Authorization: "Bearer " + token}})
    .then(response => {
      this.user = response.data;
    })
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    
    deletePost() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      axios.delete("http://localhost:3000/api/auth/post/" + this.post.id,{
      headers: {Authorization: "Bearer " + token}})
      .then(response => {
        this.$router.push = response.data;
        if (response) {
          window.location.reload();
        }
      })
    },
    /*addLike(){
      this.like = 1;
      const formData = {like : this.like, userIdLike : this.userId}
      axios.post("http://localhost:3000/api/article/"  + this.article_id + "/like", formData, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(() => {
        this.getPost();
      })
    },
    cancel() {
      location.reload();
    }*/
  }
};



</script>

<style scoped>

a {
  text-decoration: none;
  color: red;
}

#app {
  display: flex;
  justify-content: space-around;
}

.form-row {
  display: flex;
  gap:16px;
  flex-wrap: wrap;
}
.card-text {
  border: none;
  border-radius: 20px;
  background: white;
  font-weight: 500;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
}

.card-file {
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
}

.cover {
  object-fit: cover;
}

.form-row__input::placeholder {
  color:#aaaaaa;    
}

.date-time {
  color: gray;
  font-size: 12px;
}

.modifPost, .deletePost {
  color: black;
  border-radius: 6px;
  font-size: 14px;
  margin: 10px 10px 10px 0;
}

.modifPost:hover, .deletePost:hover {
  cursor: pointer;
  background: #FD2D01;
  color: white;
  
  
  
}


</style>
