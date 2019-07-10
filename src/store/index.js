import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import API from '../services/weatherApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
    searchMode: null,
    weatherData: null,
  },
  mutations: { // Conventionally equivalent to Redux Reducers
    SET_LOCATION(state, payload) {
      state.location = payload;
    },
    SET_SEARCH_MODE(state, payload) {
      state.searchMode = payload;
    },
    SET_WEATHER_DATA(state, payload) {
      state.weatherData = payload;
    },
  },
  actions: {
    setSearchMode({ commit }, value) {
      commit('SET_SEARCH_MODE', value);
    },
    setLocation({ state, commit, dispatch }, payload) {
      if (state.location == null) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { longitude, latitude } = position.coords;
          commit('SET_LOCATION', { longitude, latitude });
          dispatch('fetchWeatherData', { lat: latitude, lon: longitude });
        });
      } else {
        commit('SET_LOCATION', payload);
      }
    },
    async fetchWeatherData({ commit }, payload) {
      const params = {
        ...payload,
        APPID: API.key,
        cnt: API.cnt,
      };

      const { data } = await axios.get(API.url, { params });
      commit('SET_WEATHER_DATA', data);
    },
  },
});
