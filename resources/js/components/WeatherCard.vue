<template>
  <div v-if="!isLoading">
    <v-card class="mx-auto" color="primary" elevation="5">
      <v-list-item three-line class="mb-12">
        <v-list-item-content>
          <div class="overline mb-4">
            <v-icon color="white" size="16">mdi-map-marker-outline</v-icon>
            <span class="white--text">Tokyo</span>
          </div>
        </v-list-item-content>

        <v-list-item-avatar height="60" min-width="80" width="80" class="d-flex flex-column">
          <v-img
            :src="'http://openweathermap.org/img/wn/' + currentData.weather[0].icon + '@2x.png'"
            alt="Weather Logo"
          />
          <span class="white--text caption">{{currentData.weather[0].description}}</span>
        </v-list-item-avatar>
      </v-list-item>
      <v-container class="pb-12">
        <v-row>
          <v-col sm="6" class="text-center border-temperature-right">
            <span
              class="display-3 font-weight-bold white--text"
            >{{toCelsius(currentData.main.temp)}}° C</span>
          </v-col>
          <v-col sm="6" class="text-center border-temperature-left">
            <span
              class="display-3 font-weight-bold white--text"
            >{{toFarenheight(currentData.main.temp)}}° F</span>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col sm="12">
            <p class="white--text mb-1 caption">
              Max Temperature:
              <span
                class="font-weight-bold"
              >{{toCelsius(currentData.main.temp_max)}}° C | {{toFarenheight(currentData.main.temp_max)}}° F</span>
            </p>
            <p class="white--text mb-0 caption">
              Min Temperature:
              <span
                class="font-weight-bold"
              >{{toCelsius(currentData.main.temp_min)}}° C | {{toFarenheight(currentData.main.temp_min)}}° F</span>
            </p>
            <p class="white--text mb-0 caption">
              Humidity:
              <span class="font-weight-bold">{{currentData.main.humidity}}%</span>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
  <div v-else>
    <v-card class="mx-auto" elevation="5">
      <div class="mb-12 d-flex justify-space-between px-4 pt-3 mb-12">
        <v-skeleton-loader type="text" width="70" />
        <div>
          <v-skeleton-loader type="avatar" width="50" class="mx-auto mb-2" />
          <v-skeleton-loader type="text" width="50" />
        </div>
      </div>
      <v-container class="pb-12">
        <v-row>
          <v-col sm="6" class="border-temperature-right loading">
            <v-skeleton-loader type="image" width="110" height="75" class="mx-auto" />
          </v-col>
          <v-col sm="6" class="border-temperature-left loading">
            <v-skeleton-loader type="image" width="110" height="75" class="mx-auto" />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col sm="12">
            <v-skeleton-loader type="text" width="150" />
            <v-skeleton-loader type="text" width="150" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import { kelvinToCelsius, kelvinToFarenheight } from "../helper";

export default {
  name: "WeatherCard",
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
