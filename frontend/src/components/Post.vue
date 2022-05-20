<template>
  <div class="card-text" v-if="post.message!=='null'">
    <p class="mb-0">{{post.message}}</p>
    <div id="app">
      <p>{{currentDateTime()}}</p>
    </div>
    
  </div>
  
</template>

<script>

import { mapState } from 'vuex';
import moment from 'moment';


export default {
  name: 'CreatePost',
  data() {
    return {};
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
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    currentDateTime() {
      return moment().format('MMMM Do YYYY, h:mm:ss a')
    }
  },
}



</script>

<style scoped>
.form-row {
    display: flex;
    gap:16px;
    flex-wrap: wrap;
}
.card-text {
    border: none;
    border-radius: 20px;
    background: white;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    color: black;
}
.form-row__input::placeholder {
    color:#aaaaaa;    
}



</style>
