<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="abonnes == 0">Aucun abonnés pour le moment 🥲</P>
    <p v-else-if="abonnes == 1">Une personne s'est abonnée, c'est un bon début 😜</P>
    <p v-else>{{abonnes}} personnes se sont abonnées 🔥</p>
    <button v-on:click="subscribe()">S'abonner !</button>

  </div>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function(){
    return{
      abonnes: 0,
    }
  },
  methods: {
    subscribe: function() {
      this.abonnes++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 20px 0 0;
  font-size: 24px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
}

</style>
