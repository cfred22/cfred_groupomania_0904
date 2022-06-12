<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<template>
  <Transition name="modal" >
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
      
        <div class="modal-container" @click.stop="">

          <div class="modal-body">
            <slot name="body">
              <form enctype="multipart/form-data" action="/update" method="put">

                <div class="input">
                  <label class="title_txt_modal" for="input_text">Modifiez votre texte</label>
                  <br />
                  <textarea class="input-text" id="inputNewText" type="text" v-model="updatePost.message"></textarea>
                  <div class="input-group mb-3">
                    <div class="input-group">
                  </div>
                  <div class="file-input button">
                    <input name="image" type="file" id="file" class="file" @change="selectFile()" ref="image"/>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <slot name="footer">
                    <button
                      class="modal-default-button button" type="submit" @click="modifyPost()">OK
                    </button>
                    </slot>
                  </div> 
                  <!--<button @click.prevent="createPost()" class="button" :class="{'button--disabled' : !validatedFields}">
                    <span v-if="status == 'loading'">envoi du message...</span>
                    <span v-else>Envoyer</span>
                  </button>-->
                </div>
              </form>
            </slot>
          </div>
          <!-- <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button button"
                @click="$emit('close')"
                >OK
              </button>
            </slot>
          </div> -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.cross {
  background: none;
  border: none;
  cursor: pointer;
  
}

.title_txt_modal {
  font-family: Arial;
  font-weight:  bold;
  font-size: 18px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 45px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 0px 10px 30px 10px;
}

.modal-default-button {
  float: left;
  margin-top: 10px;
  font-size: 10px;

}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  margin: 10px 0 10px 0 !important;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  font-family: Arial;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
