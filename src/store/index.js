import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import API from '../services/weatherApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLocation: null,
  },
  mutations: { // Conventionally equivalent to Redux Reducers
    SET_USER_LOCATION(state, payload) {
      state.userLocation = payload;
    },
  },
  actions: {
    setUserLocation({ commit }) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        commit('SET_USER_LOCATION', { longitude, latitude });
      });
    },
    fetchWeatherData({ commit }) {
      const params = {
        APPID: API.key,
      };

      const data = axios.get(API.url, { data: params });
      commit('SET_WEATHER_DATA', data);
    },
  },
});
