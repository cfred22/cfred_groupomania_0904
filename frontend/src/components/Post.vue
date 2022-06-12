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
      <button class="like post-change" type="button" @click="like('like')" ><i class="fa-regular fa-thumbs-up"></i></button>
    </div>
 
    <div id="app">
        
      <div class="menu">  
        <button class="deletePost" v-if="post.userId == userId " type="button" @click="deletePost()"> Suppr.Post
        </button>
        <!--<button class="modifyPost" v-if="post.userId == userId " type="button" @click="modifyPost(post.id)" > Modif.Post
        </button>-->
        <button id="show-modal" class="modifyPost" v-if="post.userId == userId " type="button" @click="showModal = true">Modif.Post</button>
        <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <modalUpdate :show="showModal" @close="showModal = false">
          </modalUpdate>
        </Teleport>
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
import ModalUpdate from './ModalUpdate.vue';


export default {
  name: 'CreatePost',
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
      showModal: false,
      updatePost: {
        message: null,
        image: null
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
          location.reload();
        }
      })
    },

    modifyPost() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;

      const fd = new FormData();
      fd.append("message", this.updatePost.message);
      fd.append("image", this.updatePost.image);

      axios.put("http://localhost:3000/api/auth/post/" + this.post.id, fd, {
      headers: {Authorization: "Bearer " + token}})
      .then(response => {
        this.$router.push = response.data;
        if (response) {
          location.reload();
        }
      })
    },

    selectFile() {
      this.contentPost.image = this.$refs.image.files[0];
    }

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

.modifyPost, .deletePost {
  color: black;
  border-radius: 8px;
  border: none;
  font-size: 14px;
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
}

.message {
  margin: 10px;
}

.like {
  border: none;
  background: none;
  cursor: pointer;
}

.fa-thumbs-up {
  font-size: 16px;
  color: #FD2D01;
}





</style>
