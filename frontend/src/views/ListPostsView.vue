<template>
  <div class="post">
    <CreatePost />
    <Post v-for="post in allPosts" v-bind:key="post.message" :post="post" />
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
        createdAt: ""
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
  }
}

</script>

<style scoped>
</style>
