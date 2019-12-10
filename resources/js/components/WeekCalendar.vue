  
<template>
  <v-sheet height="200" elevation="5">
    <v-calendar dark show-month-on-first type="custom-weekly" :start="start">
      <template v-slot:day-label="{ present, past, date }">
        <div class="day-label-container">{{date | moment("D")}}</div>
      </template>
      <template v-slot:day="{ present, past, date }">
        <template v-if="isOnEvent(date).length">
          <Box class="fill-height event-container">
            <v-list-item-avatar
              @click="changeSelectedDate(date)"
              class="d-flex flex-column my-0 mx-auto"
            >
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
          </Box>
        </template>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script>
import posed from "vue-pose";
import groupBy from "lodash/groupBy";
import forEach from "lodash/forEach";

export default {
  name: "Calendar",
  components: {
    Box: posed.div({
      hoverable: true,
      init: {
        y: 0
      },
      hover: {
        y: -20
      }
    })
  },
  computed: {
    start: function() {
      const { $moment, $store } = this;
      const { selectedData } = $store.state.global;

      return $moment(selectedData.dt_dtx).format("YYYY-MM-DD");
    },
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

        if (x[0] !== undefined) {
          x[0].name = x[0].weather[0].description;
          x[0].start = $moment(x[0].dt_txt).format("YYYY-MM-DD");

          evnts.push(x[0]);
        }
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
      console.log(date);
      const { $moment, $store } = this;
      const { listOfData } = $store.state.global;

      const container = groupBy(listOfData, data =>
        $moment(data.dt_txt).format("YYYY-MM-DD")
      );

      $store.dispatch("global/changeIsLoading", true);

      setTimeout(() => {
        $store.dispatch("global/changeIsLoading", false);
        $store.dispatch("global/changeSelectedDate", container[date]);
      }, 300);
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