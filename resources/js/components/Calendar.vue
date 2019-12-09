  
<template>
  <v-sheet height="535" elevation="5">
    <v-calendar dark show-month-on-first type="month">
      <template v-slot:day-label="{ present, past, date }">
        <div class="day-label-container">{{date | moment("D")}}</div>
      </template>
      <template v-slot:day="{ present, past, date }">
        <template v-if="isOnEvent(date).length">
          <div @click="changeSelectedDate(date)" class="fill-height event-container">
            <v-list-item-avatar class="d-flex flex-column my-0 mx-auto">
              <v-img
                :src="'http://openweathermap.org/img/wn/' + isOnEvent(date)[0].weather[0].icon + '@2x.png'"
                alt="Weather Logo"
                height="25"
                width="35"
              />
              <span
                class="dark--text"
                style="line-height: 1;"
              >{{isOnEvent(date)[0].weather[0].description}}</span>
            </v-list-item-avatar>
          </div>
        </template>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script>
import groupBy from "lodash/groupBy";
import forEach from "lodash/forEach";

export default {
  name: "Calendar",
  computed: {
    events: function() {
      const { $moment, $store } = this;
      const { listOfData } = $store.state.global;
      let evnts = [];

      const container = groupBy(listOfData, data =>
        $moment(data.dt_txt).format("YYYY-MM-DD")
      );

      forEach(container, cont => {
        const x = cont.filter(
          c => $moment(c.dt_txt).format("hh:mm a") === "06:00 pm"
        );

        x[0].name = x[0].weather[0].description;
        x[0].start = $moment(x[0].dt_txt).format("YYYY-MM-DD");

        evnts.push(x[0]);
      });

      return evnts;
    }
  },
  methods: {
    isOnEvent: function(date) {
      const { $moment, $store } = this;

      const container = this.events.filter(event => event.start === date);

      return container;
    },
    changeSelectedDate: function(date) {
      const { $moment, $store } = this;
      const { listOfData } = $store.state.global;

      const container = groupBy(listOfData, data =>
        $moment(data.dt_txt).format("YYYY-MM-DD")
      );

      $store.dispatch("global/changeSelectedDate", container[date]);
    }
  }
};
</script>

<style lang="scss" scoped>
.day-label-container {
  cursor: auto !important;
}

.event-container {
  cursor: pointer;

  &:hover {
    background-color: rgb(1, 1, 1, 0.3);
  }
}
</style>