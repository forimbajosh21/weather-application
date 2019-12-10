<template>
  <div>
    <template v-if="!isLoading">
      <div>
        <PoseTransition appear>
          <DynamicBox
            :pose="isFullscreen ? 'fullscreen' : 'thumbnail'"
            v-on:click.native="isFullscreen = !isFullscreen"
          >
            <v-card
              class="mx-auto fill-height"
              :class="isFullscreen && 'fullscreen'"
              color="primary"
              elevation="5"
            >
              <div :class="isFullscreen && 'container'">
                <v-list-item three-line class="mb-12">
                  <v-list-item-content>
                    <div class="overline mb-4">
                      <Box :i="300" v-if="!isLoading">
                        <v-icon color="white" size="16">mdi-map-marker-outline</v-icon>
                        <span class="white--text">Tokyo</span>
                      </Box>
                    </div>
                  </v-list-item-content>

                  <v-list-item-avatar
                    height="60"
                    min-width="80"
                    width="80"
                    class="d-flex flex-column"
                  >
                    <v-img
                      :src="'http://openweathermap.org/img/wn/' + currentData.weather[0].icon + '@2x.png'"
                      alt="Weather Logo"
                    />

                    <span class="white--text caption description">
                      <Box :i="400" v-if="!isLoading">{{currentData.weather[0].description}}</Box>
                    </span>
                  </v-list-item-avatar>
                </v-list-item>
                <v-container class="pb-12">
                  <v-row>
                    <v-col sm="6" class="text-center border-temperature-right">
                      <Box :i="500" v-if="!isLoading">
                        <span
                          class="display-3 font-weight-bold white--text"
                        >{{toCelsius(currentData.main.temp)}}° C</span>
                      </Box>
                    </v-col>
                    <v-col sm="6" class="text-center border-temperature-left">
                      <Box :i="600" v-if="!isLoading">
                        <span
                          class="display-3 font-weight-bold white--text"
                        >{{toFarenheight(currentData.main.temp)}}° F</span>
                      </Box>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container>
                  <v-row>
                    <v-col sm="12">
                      <Box :i="700" v-if="!isLoading">
                        <p class="white--text mb-1 caption">
                          Max Temperature:
                          <span
                            class="font-weight-bold"
                          >{{toCelsius(currentData.main.temp_max)}}° C | {{toFarenheight(currentData.main.temp_max)}}° F</span>
                        </p>
                      </Box>
                      <Box :i="800" v-if="!isLoading">
                        <p class="white--text mb-0 caption">
                          Min Temperature:
                          <span
                            class="font-weight-bold"
                          >{{toCelsius(currentData.main.temp_min)}}° C | {{toFarenheight(currentData.main.temp_min)}}° F</span>
                        </p>
                      </Box>
                      <Box :i="900" v-if="!isLoading">
                        <p class="white--text mb-0 caption">
                          Humidity:
                          <span class="font-weight-bold">{{currentData.main.humidity}}%</span>
                        </p>
                      </Box>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container v-if="isFullscreen">
                  <hourly-weather :isDisplay="isFullscreen" />
                </v-container>
              </div>
            </v-card>
          </DynamicBox>
        </PoseTransition>
      </div>
    </template>
    <template v-else>
      <v-card class="mx-auto" elevation="5">
        <div class="d-flex justify-space-between px-4 pt-12 mb-12">
          <v-skeleton-loader type="text" width="70" />
          <div>
            <v-skeleton-loader type="avatar" width="50" class="mx-auto mb-2" />
            <v-skeleton-loader type="text" width="50" />
          </div>
        </div>
        <div class="d-flex justify-space-between mb-12 pb-12">
          <v-skeleton-loader type="image" width="35%" height="75" class="mx-auto" />
          <v-skeleton-loader type="image" width="35%" height="75" class="mx-auto" />
        </div>
        <v-container>
          <v-skeleton-loader type="text" width="150" />
          <v-skeleton-loader type="text" width="150" />
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<script>
import posed, { PoseTransition } from "vue-pose";

import isEmpty from "lodash/isEmpty";
import { kelvinToCelsius, kelvinToFarenheight } from "../helper";

import HourlyWeather from "./HourlyWeather";

export default {
  name: "WeatherCard",
  components: {
    HourlyWeather,
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
    }),
    DynamicBox: posed.div({
      fullscreen: {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        right: 0,
        transition: { type: "tween" },
        flip: true,
        beforeChildren: true
      },
      thumbnail: {
        width: "100%",
        height: "100%",
        position: "relative",
        top: "auto",
        right: "auto",
        transition: { type: "tween" },
        flip: true,
        afterChildren: true
      }
    })
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    isLoading: function() {
      return this.$store.state.global.isLoading;
    },
    currentData: function() {
      const { $moment, $store } = this;
      const { selectedData } = $store.state.global;

      if (!isEmpty(selectedData)) {
        const container = selectedData.filter(
          data => $moment(data.dt_txt).format("hh:mm a") === "06:00 pm"
        );

        return container[0];
      }

      return {};
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

<style lang="scss" scoped>
.description {
  line-height: 1;
}

.fullscreen {
  overflow: hidden;
  overflow-y: auto;
}
</style>