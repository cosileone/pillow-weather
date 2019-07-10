import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import API from '../services/weatherApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
    searchMode: null,
    weatherData: {
      coord: {
        lon: -73.99,
        lat: 40.73,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      base: 'stations',
      main: {
        temp: 297.96,
        pressure: 1017,
        humidity: 51,
        temp_min: 294.15,
        temp_max: 302.15,
      },
      visibility: 16093,
      wind: {
        speed: 0.42,
        deg: 74.395,
      },
      clouds: {
        all: 1,
      },
      dt: 1562725157,
      sys: {
        type: 1,
        id: 4686,
        message: 0.0169,
        country: 'US',
        sunrise: 1562664771,
        sunset: 1562718543,
      },
      timezone: -14400,
      id: 5128581,
      name: 'New York',
      cod: 200,
    },
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
      };

      const { data } = await axios.get(API.url, { params });
      commit('SET_WEATHER_DATA', data);
    },
  },
});
