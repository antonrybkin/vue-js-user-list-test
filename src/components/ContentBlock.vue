<template>
  <v-container>
    <v-row justify="center" class="ma-4">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <filter-block @filter-changed="handleFilterChange"></filter-block>

      <user-list></user-list>
    </v-row>
  </v-container>
</template>

<script>
import FilterBlock from "./FilterBlock.vue";
import UserList from "./UserList.vue";
import { mapActions } from "vuex";

export default {
  name: "ContentBlock",
  components: {
    FilterBlock,
    UserList,
  },
  methods: {
    ...mapActions(["updateFilters", "fetchUsers"]),
    handleFilterChange(filters) {
      this.updateFilters(filters);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
