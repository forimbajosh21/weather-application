<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="12" lg="7" xl="7">
        <search-field />
        <div class="hidden-md-and-down">
          <calendar />
        </div>
        <div class="hidden-lg-and-up">
          <week-calendar />
        </div>
      </v-col>
      <v-col sm="12" md="12" lg="5" xl="5">
        <weather-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchField from "../components/SearchField";
import WeatherCard from "../components/WeatherCard";
import Calendar from "../components/Calendar";
import WeekCalendar from "../components/WeekCalendar";

export default {
  name: "Index",
  components: {
    SearchField,
    WeatherCard,
    Calendar,
    WeekCalendar
  }
};
</script>