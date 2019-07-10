<template>
  <div>
    <select v-model="selectedUnit">
      <option v-for="unit in temperatureUnits" :key="unit.key" :value="unit.value">
        {{ unit.key }}
      </option>
    </select>
    <h2>Temperature Outside: {{ temperatureData.temp.toFixed(0) }} {{ displayedUnit }}</h2>
    <div v-for="key in preferredData" :key="key">
      <h3>{{ key.charAt(0).toUpperCase()+key.slice(1) }}</h3>
      <div :id="`chartist-${key}`"></div>
    </div>
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
      preferredData: [
        'temperature',
        'humidity',
        'pressure',
      ],
    };
  },
  computed: {
    ...mapState([
      'weatherData',
    ]),
    temperatureData() {
      const { temp_min: min, temp_max: max, temp } = this.weatherData.list[0].main;

      if (!this.weatherData) return null;

      if (this.selectedUnit === 'c') {
        return this.convertToCelsius({ min, max, temp });
      }

      return this.convertToFahrenheit({ min, max, temp });
    },
    displayedUnit() {
      return this.temperatureUnits.find(unit => unit.value === this.selectedUnit).key;
    },
    labels() {
      return this.weatherData.list.map(datum => new Date(datum.dt_txt).toLocaleDateString('en-US'));
    },
  },
  methods: {
    convertToCelsius({ min, max, temp }) {
      const results = { min, max, temp };

      Object.keys(results).forEach((key) => {
        results[key] -= 273.15;
      });

      return results;
    },
    convertToFahrenheit({ min, max, temp }) {
      const results = { min, max, temp };

      Object.keys(results).forEach((key) => {
        results[key] = (results[key] - 273.15) * (9 / 5) + 32;
      });

      return results;
    },
    getDataByKey(array, key) {
      let results = array.map(datum => datum.main[key]);

      if (key === 'temp') {
        results = results.map((temperature) => {
          let newTemp;
          if (this.selectedUnit === 'c') {
            newTemp = temperature - 273.15;
          } else {
            newTemp = (temperature - 273.15) * (9 / 5) + 32;
          }
          return newTemp;
        });
      }

      return results;
    },
    createData(key) {
      const lookupKey = key === 'temperature' ? 'temp' : key;
      return {
        labels: this.labels,
        series: [
          this.getDataByKey(this.weatherData.list, lookupKey),
        ],
      };
    },
  },
  updated() {
    // const data = this.createData();
    // console.log(data);
    // new Chartist.Line('#chartist', data);
    this.preferredData.forEach((key) => {
      // eslint-disable-next-line
      new Chartist.Line(`#chartist-${key}`, this.createData(key));
    });
  },
};
</script>

<style lang="scss">
  @import "chartist/dist/scss/chartist.scss";
</style>
