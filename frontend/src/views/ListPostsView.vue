<template>
  <div class="card">
    <h1 class="cardtitle">Forum Groupomania</h1>
    <div class="form-row">
      <form action="/" method="post">
        <input v-model="messagePost.message" class="form-row__input" type="text" placeholder="Quoi de neuf ?" />
        <button @click.prevent="createPost()" class="button" :class="{'button--disabled' : !validatedFields}">
          <span v-if="status == 'loading'">envoi du message...</span>
          <span v-else>Envoyer</span>
        </button>
      </form>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import { mapState } from 'vuex';



export default {
  name: 'ListPostsView',
  data() {
    return {
      messagePost: {
        message: null,
      },
      msgError: '',
      post: '',
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
    ...mapState(['status'])
  },
  
  methods: {
    createPost() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      var userId = storage.userId;

      const fd = new FormData();
      fd.append("message", this.messagePost.message);
      fd.append("userId", userId);

      axios
        .post("http://localhost:3000/api/auth/post", fd, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => {
          //Si retour positif de l'API reload de la page pour affichage du dernier post
          if (response) {
            window.location.reload();
          }
        })
        .catch(error => (this.msgError = error));
    }
  }
  
}

</script>





<style scoped>
  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row__input {
    padding: 12px;
    margin: 15px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    color: black;
  }
  .form-row__input::placeholder {
    color:#aaaaaa;
    
    
  }
</style>
