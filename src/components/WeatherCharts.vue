<template>
  <div>
    <select v-model="selectedUnit">
      <option v-for="unit in temperatureUnits" :key="unit.key" :value="unit.value">
        {{ unit.key }}
      </option>
    </select>
    <p>{{ temperatureData.temp.toFixed(0) }} {{ displayedUnit }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chartist from 'chartist';

export default {
  name: 'WeatherCharts',
  data() {
    return {
      temperatureUnits: [
        { key: '°C', value: 'c' },
        { key: '°F', value: 'f' },
      ],
      selectedUnit: 'f',
    };
  },
  computed: {
    ...mapState([
      'weatherData',
    ]),
    temperatureData() {
      const { temp_min: min, temp_max: max, temp } = this.weatherData.main;

      if (this.selectedUnit === 'c') {
        return this.convertToCelsius({ min, max, temp });
      }

      return this.convertToFahrenheit({ min, max, temp });
    },
    displayedUnit() {
      return this.temperatureUnits.find(unit => unit.value === this.selectedUnit).key;
    },
  },
  methods: {
    convertToCelsius(temperatures) {
      const results = { ...temperatures };

      Object.keys(results).forEach((key) => {
        results[key] -= 273.15;
      });

      return results;
    },
    convertToFahrenheit(temperatures) {
      const results = { ...temperatures };

      Object.keys(results).forEach((key) => {
        results[key] = (results[key] - 273.15) * (9 / 5) + 32;
      });

      return results;
    },
  },
};
</script>

<style lang="scss">
  @import "chartist/dist/scss/chartist.scss";
</style>
