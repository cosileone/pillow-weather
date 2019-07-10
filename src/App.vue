<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <SearchBar />
    <WeatherCharts v-if="$store.state.weatherData"></WeatherCharts>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import WeatherCharts from './components/WeatherCharts.vue';

export default {
  name: 'app',
  components: {
    SearchBar,
    WeatherCharts,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
