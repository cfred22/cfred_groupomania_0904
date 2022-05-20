<template>
  <div id="post" class="post">
    <CreatePost class="createPost"/>
    <Post v-for="post in allPosts.reverse()" class="onepost" v-bind:key="post.message" :post="post" />
    

  </div>
</template>

<script>
import axios from "axios";
import CreatePost from '@/components/CreatePost.vue';
import Post from '@/components/Post.vue';



export default {
  name: 'ListPostsView',
  components: {
    CreatePost,
    Post
  },
  data() {
    return {
      post: {
        id: "",
        message: "",
        image: "",
        userId:"",
        
      },
      allPosts: []
    };
  },
  mounted() {
    var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      
    
    axios
      .get("http://localhost:3000/api/auth/post", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      })
    
  },
  /*methods: {
    getUser() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;

      axios
      .get("http://localhost:3000/api/auth/profile/", {
        headers: {
          Authorization: "Bearer " + token
        },
        data: {
          userId: this.userId,
        }
      })
      .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      })  
    }
  }*/
}

</script>

<style scoped>
.post {
  min-height: 100%;
  margin-top: 50px;
}

.createPost {
  padding: 2px 100px 10px 100px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
}

.onepost {
  margin-top: 20px;  
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

</style>
