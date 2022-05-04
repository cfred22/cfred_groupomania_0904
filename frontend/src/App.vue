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

body {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}


.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

.button {
  background: #2196F3;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}

.card__action {
  color:#2196F3;
  text-decoration: underline;
}
.card__action:hover {
  cursor:pointer;
}

.button:hover {
  cursor:pointer;
  background: #1976D2;
}

.button--disabled {
  background:#cecece;
  color:#ececec
}

.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}

</style>
