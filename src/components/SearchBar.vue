<template>
  <form @submit.prevent="submitForm">
    <select :value="searchMode" @input="setSearchMode($event.target.value)">
      <option value="" disabled selected>Search by</option>
      <option value="name">Name</option>
      <option value="coordinates">Coordinates</option>
      <option value="zipcode" disabled>Zip Code</option>
    </select>
    <template v-if="searchMode === 'coordinates'">
      <input :value="location.latitude" type="text" placeholder="Latitude">
      <input :value="location.longitude" type="text" placeholder="Longitude">
    </template>
    <input v-else v-model="q" type="text" placeholder="Search for a city">
    <button type="submit">Search</button>
    <p>
      <em>(Search by city name, zipcode, or longitude & latitude coordinates.)</em>
    </p>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      q: null,
    };
  },
  computed: {
    ...mapState([
      'searchMode',
      'location',
    ]),
  },
  methods: {
    ...mapActions([
      'setSearchMode',
      'setLocation',
      'fetchWeatherData',
    ]),
    submitForm() {
      let params = {};
      if (this.searchMode === 'coordinates') {
        params = {
          lat: this.location.latitude,
          lon: this.location.longitude,
        };
      } else {
        params = { q: this.q };
      }

      this.fetchWeatherData(params);
    },
  },
  created() {
    this.setLocation();
  },
};
</script>

<style scoped>

</style>
