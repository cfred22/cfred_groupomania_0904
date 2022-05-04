<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Connexion</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

#logo {
  width: 250px;
}

a {
  text-decoration: none;
  color: gray;
}

.router-link-active {
  font-weight: bold;
  color: darkred;
}




</style>
