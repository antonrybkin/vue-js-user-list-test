<template>
  <v-col cols="12" md="4">
    <v-select
      v-model="countryFilter"
      :items="countryItems"
      clearable
      label="Filter by country"
      @change="applyFilter"
    ></v-select>

    <v-select
      v-model="scoreFilter"
      :items="scoreItems"
      clearable
      label="Filter by score"
      @change="applyFilter"
    ></v-select>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterBlock",
  data() {
    return {
      countryItems: ["Russia", "USA"],
      scoreItems: ["> 20", "< 10"],
      countryFilter: null,
      scoreFilter: null,
    };
  },
  methods: {
    ...mapActions(["updateFilters"]),
    applyFilter() {
      this.updateFilters({
        country: this.countryFilter,
        score: this.scoreFilter,
      });
    },
  },
};
</script>
