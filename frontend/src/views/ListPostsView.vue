<template>
  <div class="card">
    <h1 class="card__title">Forum entreprise Groupomania</h1>
    <div class="form-row">
        <input class="form-row__input" type="text" placeholder="Quoi de neuf ?"/>
        <button @click="createPost()" class="button" :class="{'button--disabled' : !validatedFields}">
          <span v-if="status == 'loading'">envoi du message...</span>
          <span v-else>Envoyer</span>
        </button>
    </div>

    
  </div>
</template>

<script>

import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: 'ListPostsView',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    createPost() {
      const fd = new FormData();
      fd.append("message", this.messagePost.message);
      
      axios
        .post("http://localhost:3000/api/auth/infos", fd, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token")
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

</style>>
