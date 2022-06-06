<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Connexion </router-link> | 
    <button @click="logout()" class="logout infobulle" aria-label="Déconnexion">
      👋 
    </button>
    
  </nav>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/');
    },
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
  flex: 1;
  background: #4E5166;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
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
  cursor: not-allowed;
  background:#cecece;
}

.link:hover {
  color: red;
  cursor: pointer;
  font-weight: bold;
}

.logout {
  border: none;
  background: none;
  cursor: pointer;
}

.infobulle {
  position: relative;  /* les .infobulle deviennent référents */
  cursor: help;
}
.infobulle:hover::after,
.infobulle:focus::after {
  content: attr(aria-label);  /* on affiche aria-label */
  position: absolute;
  font-size: 15px;
  right: -40px;
  top: -24px;
  color: gray;
  padding: 2px;
  background: #DCDCDC;
  transform: translateX(-10%); /* on centre horizontalement  */
  z-index: 1; /* pour s'afficher au dessus des éléments en position relative */
  white-space: nowrap;  /* on interdit le retour à la ligne */
}

/* on génère un second élément en :before pour la flèche */

[aria-label]:hover:before,
[aria-label]:focus:before {
  content: "▼";
  position: absolute;
  top: -14px;
	left: 50%;
	transform: translateX(-50%); /* on centre horizontalement  */
  font-size: 20px;
  color: #DCDCDC;
}

/* pas de contour durant le :focus */
[aria-label]:focus {
  outline: none;
}


</style>
