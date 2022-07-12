<template>
  <div class="card">
    <h1 class="cardtitle">Forum Groupomania</h1>
    <div class="form-row">
      <form action="/" method="post">
        <input v-model="contentPost.message" class="form-row__input" type="text" placeholder="Quoi de neuf ?" />
        <div class="input-group mb-3">
          <div class="input-group button">
            <label for="file">Télécharger image</label>
          </div>
          <div class="file-input">
            <input name="image" type="file" id="file" class="file" @change="selectFile()" ref="image"/>
          </div>
        </div>
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
  name: 'CreatePost',
  data() {
    return {
      contentPost: {
        message: null,
        image: null
      },
      msgError: '',
      post: '',
      imgPost: {
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
    ...mapState(['status', 'editOption'])
  },
  
  methods: {   
    createPost() {
      var storage = JSON.parse(localStorage.getItem("user"));
      var token = storage.token;
      var userId = storage.userId;

      const fd = new FormData();
      fd.append("message", this.contentPost.message);
      fd.append("userId", userId);

      fd.append("image", this.contentPost.image);
      fd.append("active", true);

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
    },
    selectFile() {
      this.contentPost.image = this.$refs.image.files[0];
    }
  }
}
</script>

<style scoped>
.form-row {
  margin: 16px 0px;
  gap:16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 15px;
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

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.button {
  margin: 10px !important;
}

</style>
