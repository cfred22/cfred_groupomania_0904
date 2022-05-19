<template>
  <div class="card-text" v-if="post.message!=='null'">
    <p class="mb-0">{{post.message}}</p>
  </div>
  
</template>

<script>

import { mapState } from 'vuex';

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
  
  methods: {}
  
}
</script>

<style scoped>
.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
}
.form-row__input {
    padding: 12px;
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

</style>
