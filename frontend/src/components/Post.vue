<template>
  <div class="card-text" v-if="post.message!=='null'">
    <p class="mb-0">{{post.message}}</p>
    <div id="app">
        <button
          class="modifPost button"
          
          type="button"
          @click="modify('modify');"
          >Modif. 🖊️
          </button>
      <div class="menu-modif" >
        <button
          class="deletePost button"
          
          type="button"
          @click="deletePost('delete');"
          >Suppr. 🗑️
        </button>
        
      </div>
       <div class="menu-like" >
        <button
          class="like button"
          
          type="button"
          @click="like('like');"
          >like 👍
        </button>
        
      </div>
      
      
    </div>
    
    
    
  </div>
  
</template>

<script>

import { mapState } from 'vuex';


export default {
  name: 'CreatePost',
  components: {},
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
    ...mapState(['status', 'user'])
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    
    deletePost(value) {
      this.$store.dispatch("deletePost", value);
    }
  }
};



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
  color: black;
  display: flex;
  justify-content: space-between;
}
.form-row__input::placeholder {
  color:#aaaaaa;    
  
}

.deletePost, .modifPost, .like {
  
  font-size: 12px;
  margin: 10px 0 10px 0;
  
}





</style>
