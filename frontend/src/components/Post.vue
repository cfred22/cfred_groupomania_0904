<template>

  <div class="card-text" v-if="post.message!=='null'">
    <div class="card-userName">
      <router-link :to="{ path:'/UserInfos/' + user.id }" >
      <p class="userName"> <i class="fa-regular fa-face-smile"></i> {{user.firstName}} {{user.lastName}}</p>
      </router-link>
      <p class="date-time"> Publié le {{ new Date(post.createdAt).toLocaleString() }}</p>
    </div>

    <div class="card-file">
      <img class="cover" v-if="post.imageUrl" :src="post.imageUrl"  alt="Image" height="250" width="300"/>
      <img v-else />
    </div>

    <div class="card-messageTxt"> 
      <p class="message">{{post.message}}</p>

      <!--<button class="like post-change" type="button" @click="addLike()" ><i class="fa-regular fa-heart"></i></button>-->
      <div v-if="(this.userLike == true)" class="liked">
          <button class="buttonLike like" @click="addLike()"><i class="fa-solid fa-heart" v-bind:style="styleObject"></i></button>
          <div> {{this.likes}} </div>
      </div>
      <div v-else class="liked">
          <button class="buttonLike like" @click="addLike()"><i class="fa-regular fa-heart"></i></button>
          <div> {{this.likes}} </div>
      </div>
    </div>
 
    <div id="app">
        
      <div class="menu">  
        <button class="deletePost" v-if="post.userId == userId " type="button" @click="deletePost()"> Suppr.Post
        </button>
        <button id="show-modal" data-target="#modalEditPost" class="modifyPost" v-if="post.userId == userId " type="button" @click="emitModal()">Modif.Post</button>
        <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <modalUpdate :show="showModal" @close="showModal = false" v-bind:postId="post.id">
          </modalUpdate>
        </Teleport>

        <!--Admin  active/desactived post-->
        <div v-if="(this.active == false)" class="liked">
          <button id="show-modal" class="modifyPost" v-if="isAdmin == true" type="button" @click="toggleActive()">Activ.Post</button>
        </div>
        <div v-else class="liked">
          <button id="show-modal" class="modifyPost" v-if="isAdmin == true" type="button" @click="toggleActive()">Desact.Post</button>
        </div>

      </div>      
    </div>
  </div> 
</template>

<script>
import axios from "axios";
import ModalUpdate from './ModalUpdate.vue';

export default {
  name: 'PostComponent',
  components: {
    ModalUpdate
  },
  data() {
    var storage = JSON.parse(localStorage.getItem("user"));
    return {
      userId: storage.userId, 
      user: {
        firstName: this.post.user.firstName,
        lastName: this.post.user.lastName,
        id: this.post.user.id,
      }, 
      isAdmin: false,
      active: 1,
      checkLiker: "",
      userLike : false,
      likes: "0",     
      showModal: false,
      styleObject: {
      color: '#FD2D01'
    }
    }
  },
   computed: {},
  
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  created() { 
    this.getPost();
    this.checkAdmin();
  },
  methods: {

    getPost(){
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;

      axios.get("http://localhost:3000/api/auth/post/" + this.post.id, {
      headers: {Authorization: "Bearer " + token}})
      .then(response => {
        this.checkLiker = response.data;
        this.userLiked = this.checkLiker.usersLiked.find(p => p == this.userId);
        this.likes = response.data.likes;
        
        if (this.userLiked != undefined){
          this.userLike = true;
        }
        else {
          this.userLike = false;
        }
        // ACTIVE:DESACTIVE
        if(response.data.active == true){
        this.active = 1;
      } else if (response.data.active == false) {
        this.active = 0;
      } 
      })
      .catch(error => { 
        if (error.response.status == 401) {
          this.$router.push('/login' );
          localStorage.clear();
        }
      })
    },
    
    deletePost() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      axios.delete("http://localhost:3000/api/auth/post/" + this.post.id,{
      headers: {Authorization: "Bearer " + token}})
      .then(response => {
        this.$router.push = response.data;
        if (response) {
          location.reload();
        }
      })
    },    
    emitModal() {
      this.showModal = true;
      this.$emit("infosPost", { post: this.post });
    },

    selectFile() {
      this.contentPost.image = this.$refs.image.files[0];
    },
    addLike() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      this.like = 1;

      const formData = {
        like : this.like,
        userIdLike : this.userId
        }
        
      axios.post("http://localhost:3000/api/auth/post/"  + this.post.id + "/like", formData, {
      headers: {Authorization: "Bearer " + token}})
      .then(() => {
        this.getPost();
      })
    },

    checkAdmin() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      
      axios.get("http://localhost:3000/api/auth/profile/" + storage.userId, {
      headers: {Authorization: "Bearer " + token}})
      .then(response => {
      this.isAdmin = response.data.isAdmin;
    })
    },
    toggleActive() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;

      this.getPost();

      if(this.active == 1){
        this.active = 0;
      } else if (this.active == 0) {
        this.active = 1;
      } 

      const formData = {
        active : this.active,
        }
        
      axios.post("http://localhost:3000/api/auth/post/"  + this.post.id + "/active", formData, {
      headers: {Authorization: "Bearer " + token}})
      .then(() => {
        this.getPost();
      })
    }
  }
};


</script>

<style scoped>

.userName {
  text-decoration: none;
  color: black;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
}
.userName:hover {
  color: #FD2D01;
  text-decoration: underline;
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
  font-family: 'Lato', Helvetica, sans-serif;
}

.card-file {
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
}

.cover {
  object-fit: cover;
  border-radius: 6px;
}

.form-row__input::placeholder {
  color:#aaaaaa;    
  font-family: 'Lato', Helvetica, sans-serif;
}

.date-time {
  color: gray;
  font-size: 12px;
}

.modifyPost, .deletePost {
  color: black;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-family: 'Lato', Helvetica, sans-serif;
  margin: 10px 10px 10px 0;
  padding: 10px;
  background: #FFD7D7;
}

.modifyPost:hover, .deletePost:hover {
  cursor: pointer;
  background: #FD2D01;
  color: white;
}

.card-messageTxt {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.message {
  margin: 10px;
  max-width: 500px;
}

.like {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: gray;
}

.liked {
  display: flex;
  align-items: baseline;
  justify-content: space-around;
}


</style>
