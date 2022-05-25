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
  color: #FD2D01;
}

body {
  background: #FBFCFA;
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
  background: #4E5166;
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
  text-decoration: underline;
}
.card__action:hover {
  cursor:pointer;
}

.button:hover {
  cursor:pointer;
  background: #FD2D01;
}

.button--disabled {
  background: #FFD7D7;
  color: #666;
}

.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}

</style>
