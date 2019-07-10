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
      cod: '200',
      message: 0.0132,
      cnt: 5,
      list: [
        {
          dt: 1562738400,
          main: {
            temp: 295.06,
            temp_min: 295.06,
            temp_max: 298,
            pressure: 1017.82,
            sea_level: 1017.82,
            grnd_level: 1009.36,
            humidity: 45,
            temp_kf: -2.94,
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01n',
            },
          ],
          clouds: {
            all: 5,
          },
          wind: {
            speed: 1.28,
            deg: 353.977,
          },
          sys: {
            pod: 'n',
          },
          dt_txt: '2019-07-10 06:00:00',
        },
        {
          dt: 1562749200,
          main: {
            temp: 294.3,
            temp_min: 294.3,
            temp_max: 296.5,
            pressure: 1017.61,
            sea_level: 1017.61,
            grnd_level: 1009.25,
            humidity: 48,
            temp_kf: -2.2,
          },
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: 'broken clouds',
              icon: '04n',
            },
          ],
          clouds: {
            all: 58,
          },
          wind: {
            speed: 1.44,
            deg: 335.239,
          },
          sys: {
            pod: 'n',
          },
          dt_txt: '2019-07-10 09:00:00',
        },
        {
          dt: 1562760000,
          main: {
            temp: 297.15,
            temp_min: 297.15,
            temp_max: 298.615,
            pressure: 1017.8,
            sea_level: 1017.8,
            grnd_level: 1009.76,
            humidity: 45,
            temp_kf: -1.47,
          },
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: 'broken clouds',
              icon: '04d',
            },
          ],
          clouds: {
            all: 69,
          },
          wind: {
            speed: 1,
            deg: 321.403,
          },
          sys: {
            pod: 'd',
          },
          dt_txt: '2019-07-10 12:00:00',
        },
        {
          dt: 1562770800,
          main: {
            temp: 303.87,
            temp_min: 303.87,
            temp_max: 304.6,
            pressure: 1017.46,
            sea_level: 1017.46,
            grnd_level: 1009.3,
            humidity: 39,
            temp_kf: -0.73,
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04d',
            },
          ],
          clouds: {
            all: 93,
          },
          wind: {
            speed: 1.31,
            deg: 251.149,
          },
          sys: {
            pod: 'd',
          },
          dt_txt: '2019-07-10 15:00:00',
        },
        {
          dt: 1562781600,
          main: {
            temp: 307,
            temp_min: 307,
            temp_max: 307,
            pressure: 1016.67,
            sea_level: 1016.67,
            grnd_level: 1007.97,
            humidity: 33,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04d',
            },
          ],
          clouds: {
            all: 95,
          },
          wind: {
            speed: 3.79,
            deg: 241.229,
          },
          sys: {
            pod: 'd',
          },
          dt_txt: '2019-07-10 18:00:00',
        },
      ],
      city: {
        id: 5128581,
        name: 'New York',
        coord: {
          lat: 40.7306,
          lon: -73.9867,
        },
        country: 'US',
        population: 8175133,
        timezone: -14400,
      },
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
        cnt: API.cnt,
      };

      const { data } = await axios.get(API.url, { params });
      commit('SET_WEATHER_DATA', data);
    },
  },
});
