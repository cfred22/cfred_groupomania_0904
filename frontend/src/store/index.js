import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
  });

// Création du store
const store = createStore({
    state: {
    },
    actions: {
        signup: ({commit}, userProfile) => {
            return new Promise((resolve, reject) => {
            commit;
            instance.post('auth/signup', userProfile)
              .then(function (response) {
                resolve(response);  //ok user création bdd
              })
              .catch(function (error) {
                reject(error);
            });

            });
        }
    }
})

export default store;