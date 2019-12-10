<template>
  <v-row justify="center" align="center">
    <v-divider vertical></v-divider>
    <v-col sm="12" md="2" class="text-center">
      <v-list-item-avatar
        height="100%"
        min-width="80"
        width="80"
        class="d-flex flex-column mx-auto"
      >
        <v-img
          :src="'http://openweathermap.org/img/wn/' + currentData[0].weather[0].icon + '@2x.png'"
          alt="Weather Logo"
        />

        <span class="white--text caption description">
          <PoseTransition appear>
            <Box :i="300" v-if="isDisplay">{{currentData[0].weather[0].description}}</Box>
          </PoseTransition>
        </span>
      </v-list-item-avatar>
      <p class="white--text mb-1 caption">
        High:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[0].main.temp_max)}}° C | {{toFarenheight(currentData[0].main.temp_max)}}° F</span>
      </p>
      <p class="white--text mb-0 caption">
        Low:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[0].main.temp_min)}}° C | {{toFarenheight(currentData[0].main.temp_min)}}° F</span>
      </p>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col sm="12" md="2" class="text-center">
      <v-list-item-avatar
        height="100%"
        min-width="80"
        width="80"
        class="d-flex flex-column mx-auto"
      >
        <v-img
          :src="'http://openweathermap.org/img/wn/' + currentData[2].weather[0].icon + '@2x.png'"
          alt="Weather Logo"
        />

        <span class="white--text caption description">
          <PoseTransition appear>
            <Box :i="400" v-if="isDisplay">{{currentData[2].weather[0].description}}</Box>
          </PoseTransition>
        </span>
      </v-list-item-avatar>
      <p class="white--text mb-1 caption">
        High:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[2].main.temp_max)}}° C | {{toFarenheight(currentData[2].main.temp_max)}}° F</span>
      </p>
      <p class="white--text mb-0 caption">
        Low:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[2].main.temp_min)}}° C | {{toFarenheight(currentData[2].main.temp_min)}}° F</span>
      </p>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col sm="12" md="2" class="text-center">
      <v-list-item-avatar
        height="100%"
        min-width="80"
        width="80"
        class="d-flex flex-column mx-auto"
      >
        <v-img
          :src="'http://openweathermap.org/img/wn/' + currentData[4].weather[0].icon + '@2x.png'"
          alt="Weather Logo"
        />

        <span class="white--text caption description">
          <PoseTransition appear>
            <Box :i="500" v-if="isDisplay">{{currentData[4].weather[0].description}}</Box>
          </PoseTransition>
        </span>
      </v-list-item-avatar>
      <p class="white--text mb-1 caption">
        High:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[4].main.temp_max)}}° C | {{toFarenheight(currentData[4].main.temp_max)}}° F</span>
      </p>
      <p class="white--text mb-0 caption">
        Low:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[4].main.temp_min)}}° C | {{toFarenheight(currentData[4].main.temp_min)}}° F</span>
      </p>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col sm="12" md="2" class="text-center">
      <v-list-item-avatar
        height="100%"
        min-width="80"
        width="80"
        class="d-flex flex-column mx-auto"
      >
        <v-img
          :src="'http://openweathermap.org/img/wn/' + currentData[6].weather[0].icon + '@2x.png'"
          alt="Weather Logo"
        />

        <span class="white--text caption description">
          <PoseTransition appear>
            <Box :i="600" v-if="isDisplay">{{currentData[6].weather[0].description}}</Box>
          </PoseTransition>
        </span>
      </v-list-item-avatar>
      <p class="white--text mb-1 caption">
        High:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[6].main.temp_max)}}° C | {{toFarenheight(currentData[6].main.temp_max)}}° F</span>
      </p>
      <p class="white--text mb-0 caption">
        Low:
        <span
          class="font-weight-bold"
        >{{toCelsius(currentData[6].main.temp_min)}}° C | {{toFarenheight(currentData[6].main.temp_min)}}° F</span>
      </p>
    </v-col>
    <v-divider vertical></v-divider>
  </v-row>
</template>

<script>
import posed, { PoseTransition } from "vue-pose";
import { kelvinToCelsius, kelvinToFarenheight } from "../helper";

export default {
  name: "HourlyWeather",
  components: {
    PoseTransition,
    Box: posed.div({
      enter: {
        opacity: 1,
        y: 0,
        transition: ({ i }) => ({ delay: i })
      },
      exit: {
        opacity: 0,
        y: 20
      }
    })
  },
  computed: {
    currentData: function() {
      return this.$store.state.global.selectedData;
    },
    isDisplay: function() {
      return this.$attrs.isDisplay;
    }
  },
  methods: {
    toCelsius(data) {
      const { state } = this.$store;

      return kelvinToCelsius(data);
    },
    toFarenheight(data) {
      const { state } = this.$store;

      return kelvinToFarenheight(data);
    }
  }
};
</script>