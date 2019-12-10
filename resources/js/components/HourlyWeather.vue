<template>
  <v-row justify="center" align="center">
    <template v-for="(item, index) in [0, 2, 4, 6]">
      <v-divider vertical :key="{index}"></v-divider>
      <v-col sm="12" md="2" class="text-center" :key="{index}">
        <v-list-item-avatar
          height="100%"
          min-width="80"
          width="80"
          class="d-flex flex-column mx-auto"
        >
          <v-img
            :src="'http://openweathermap.org/img/wn/' + currentData[item].weather[0].icon + '@2x.png'"
            alt="Weather Logo"
          />

          <span class="white--text caption description">
            <PoseTransition appear>
              <Box :i="300" v-if="isDisplay">{{currentData[item].weather[0].description}}</Box>
            </PoseTransition>
          </span>
        </v-list-item-avatar>
        <PoseTransition appear>
          <Box :i="400" v-if="isDisplay">
            <p class="white--text mb-1 caption">
              <span class="font-weight-bold">{{currentData[item].dt_txt | moment('hh:mm a')}}</span>
            </p>
          </Box>
        </PoseTransition>
        <PoseTransition appear>
          <Box :i="500" v-if="isDisplay">
            <p class="white--text mb-1 caption">
              High:
              <span
                class="font-weight-bold"
              >{{toCelsius(currentData[item].main.temp_max)}}° C | {{toFarenheight(currentData[item].main.temp_max)}}° F</span>
            </p>
          </Box>
        </PoseTransition>
        <PoseTransition appear>
          <Box :i="600" v-if="isDisplay">
            <p class="white--text mb-0 caption">
              Low:
              <span
                class="font-weight-bold"
              >{{toCelsius(currentData[item].main.temp_min)}}° C | {{toFarenheight(currentData[item].main.temp_min)}}° F</span>
            </p>
          </Box>
        </PoseTransition>
      </v-col>
      <v-divider vertical :key="{index}"></v-divider>
    </template>
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