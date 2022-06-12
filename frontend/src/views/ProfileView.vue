<template>
  <div class="card">
    <h1 class="card__title">Espace Personnel</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>{{user.firstName}} {{user.lastName}} {{user.email}}</p>
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

export default {
  name: 'ProfileView',
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
    list: function () {
      this.$store.commit('list');
      this.$router.push('/list');
    }
  }
}
</script>

<style scoped>

</style>>
