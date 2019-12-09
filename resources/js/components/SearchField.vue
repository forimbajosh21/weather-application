<template>
  <v-sheet class="mb-6" elevation="5">
    <v-autocomplete
      solo
      hide-details
      hide-selected
      placeholder="Search Cities"
      v-model="selected"
      :items="cities"
    />
  </v-sheet>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      cities: ["Tokyo", "Yokohama", "Kyoto", "Osaka", "Sapporo", "Nagoya"],
      selected: "Tokyo"
    };
  },
  watch: {
    selected: function(value) {
      this.getCityInformation(this.selected, "JP");
    }
  },
  methods: {
    onChange(value) {
      this.selected = value;
    },
    getCityInformation(city, country) {
      this.$store.dispatch("global/changeIsLoading", true);

      axios
        .get("/api/getCityInformation", {
          params: { city, country }
        })
        .then(response => {
          const { message } = response.data;
          this.getCityWeather(
            message.geocode.feature.name,
            message.geocode.feature.cc
          );
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("global/changeIsLoading", false);
        });
    },
    getCityWeather(city, country) {
      axios
        .get("/api/getCityWeather", {
          params: { city, country }
        })
        .then(response => {
          const { message } = response.data;

          this.$store.dispatch("global/changeCity", message.city);
          this.$store.dispatch("global/changeListOfData", message.list);
          this.$store.dispatch(
            "global/changeSelectedDate",
            message.list.slice(0, 8)
          );
          this.$store.dispatch("global/changeIsLoading", false);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("global/changeIsLoading", false);
        });
    }
  },
  mounted() {
    this.getCityInformation(this.selected, "JP");
  }
};
</script>