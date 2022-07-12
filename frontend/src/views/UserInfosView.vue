<template>
  <div class="card onepost">
    <h1 class="card__title">Espace Personnel</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>Je me nomme {{user.firstName}} {{user.lastName}} <br>et voici mon mail professionnel :<br>
    <br><i class="fa-solid fa-id-card-clip"></i> {{user.email}}</p>
    <img :src="user.photo"/>
    <div class="form-row">
      <button @click="list()" class="button">
        Retour Forum
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from "axios";

export default {
  name: 'ProfileView',
  data() {
    return {
      userId: "", 
      user: {
        firstName: "",
        lastName: ""
      }
    };
  },
  mounted: function () {
    var storage = JSON.parse(localStorage.getItem("user"));
    var token = storage.token;
    
    this.userId = window.location.href.split("/")[4]; 

    axios.get("http://localhost:3000/api/auth/profile/" + this.userId, {
    headers: {Authorization: "Bearer " + token}})
    .then(response => {
      this.user = response.data;
    })
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
    
  },
  methods: {
    list: function () {
      this.$store.commit('list');
      this.$router.push('/list');
    }
  }
}
</script>

<style>

.onepost {
  margin-top: 20px;
  box-shadow: 0px 1px 8px 0px rgb(0 0 0 / 6%);
  border-radius: 0.5rem;
  padding: 60px 100px 60px 100px;
  margin-bottom: 1rem;
}

</style>>
