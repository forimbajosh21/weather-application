<template>
  <v-card class="mx-auto" color="primary" elevation="5">
    <v-list-item three-line class="mb-12">
      <v-list-item-content>
        <div class="overline mb-4">
          <v-icon color="white" size="16">mdi-map-marker-outline</v-icon>
          <span class="white--text">Tokyo</span>
        </div>
      </v-list-item-content>

      <v-list-item-avatar height="60" min-width="80" width="80" class="d-flex flex-column">
        <v-img src="http://openweathermap.org/img/wn/10n@2x.png" />
        <span class="white--text caption">light rain</span>
      </v-list-item-avatar>
    </v-list-item>
    <v-container class="pb-12">
      <v-row>
        <v-col sm="6" class="text-center border-temperature-right">
          <span class="display-3 font-weight-bold white--text">13° C</span>
        </v-col>
        <v-col sm="6" class="text-center border-temperature-left">
          <span class="display-3 font-weight-bold white--text">55° F</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col sm="12">
          <p class="white--text mb-1 caption">
            Max Temperature:
            <span class="font-weight-bold">25° C | 78° F</span>
          </p>
          <p class="white--text mb-0 caption">
            Min Temperature:
            <span class="font-weight-bold">25° C | 78° F</span>
          </p>
          <p class="white--text mb-0 caption">
            Humidity:
            <span class="font-weight-bold">87%</span>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "WeatherCard"
};
</script>
