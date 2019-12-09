<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="7" lg="7" xl="7">
        <search-field />
        <calendar />
      </v-col>
      <v-col sm="12" md="5" lg="5" xl="5">
        <weather-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchField from "../components/SearchField";
import WeatherCard from "../components/WeatherCard";
import Calendar from "../components/Calendar";

export default {
  name: "Index",
  components: {
    SearchField,
    WeatherCard,
    Calendar
  }
};
</script>