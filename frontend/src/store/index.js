import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
      user = {
      userId: -1,
      token: '',
    };
  }
}


  

// Création de nouvelles instances de store
const store = createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token: '',
    },
    userInfos : {
      nom:'',
      prenom: '',
      email: '',
      photo: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
      localStorage.setItem('user' , JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos){
      state.userInfos = userInfos;
    },
  },
  actions: {
    login: ({commit}, userProfile) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
      instance.post('auth/login', userProfile)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);  //ok user connexion bdd
        })
        .catch(function (error) {
            commit( 'setStatus', 'error_login');
            reject(error);
        });
      });
    },
    signup: ({commit}, userProfile) => {
      return new Promise((resolve, reject) => {
      commit;
      instance.post('auth/signup', userProfile)
        .then(function (response) {
          commit('setStatus', 'created')
          resolve(response);  //ok user création bdd
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
            reject(error);
        });
      });
    },
    getUserInfos: ({commit}) => {
      instance.post('auth/profile')
      .then(function (response) {
        commit('userInfos', response.data.infos);
        
      })
      .catch(function () {
      });
    }
  }
})

export default store;