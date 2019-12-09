<template>
  <v-sheet class="mb-6" elevation="5">
    <v-autocomplete
      solo
      hide-details
      hide-selected
      placeholder="Search Cities"
      :items="cities"
      :menu-props="{ transition: true }"
    ></v-autocomplete>
  </v-sheet>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      cities: ["Tokyo", "Yokohama", "Kyoto", "Osaka", "Sapporo", "Nagoya"]
    };
  },
  methods: {}
};
</script>