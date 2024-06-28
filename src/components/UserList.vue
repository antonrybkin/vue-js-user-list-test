<template>
  <v-col cols="12" md="4">
    <v-card flat max-width="450" class="mx-auto">
      <v-list three-line>
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <div v-if="!filteredUsers.length" class="py-4 px-4 text-center">
          Слишком жёсткий запрос. Ничего не найдено.
        </div>
        <transition-group name="list" tag="div">
          <v-list-item
            v-for="(user, index) in filteredUsers"
            :key="index"
            @click="selectUser(user)"
          >
            <v-list-item-avatar>
              <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="user.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="user.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </transition-group>
      </v-list>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>{{ selectedUser.title }}</v-card-title>
        <v-card-text>
          <div style="display: flex; align-items: center;">
            <v-list-item-avatar>
              <v-img :src="selectedUser.avatar"></v-img>
            </v-list-item-avatar>
            <div v-if="selectedUser.location" style="margin-left: 16px;">
              <p><strong>Location:</strong> {{ selectedUser.location }}</p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "UserList",
  data() {
    return {
      dialog: false,
      selectedUser: {},
    };
  },
  computed: {
    ...mapGetters(["filteredUsers"]),
    ...mapState(["loading"]),
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
