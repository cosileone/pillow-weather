<template>
  <form @submit.prevent="">
    <select v-model="searchMode">
      <option value="" disabled selected>Search by</option>
      <option value="name">Name</option>
      <option value="coordinates">Coordinates</option>
      <option value="zipcode" disabled>Zip Code</option>
    </select>
    <input v-model="q" type="text" placeholder="Search for a city">
    <button type="submit">Search</button>
    <p>
      <em>(Search by city name, zipcode, or longitude & latitude coordinates.)</em>
    </p>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchMode: '',
      q: null,
    };
  },
  methods: {
    ...mapActions([
      'setUserLocation',
      'fetchWeatherData',
    ]),
  },
  created() {
    this.setUserLocation();
  },
};
</script>

<style scoped>

</style>
