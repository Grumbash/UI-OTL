<template>
  <div class="users">
    <h1 class="subheading grey--text">Users</h1>
    <v-container class="my-5">
      <v-layout row align-end justify-center>
        <v-flex xs2>
          <v-select
            v-model="filterStatus"
            :items="filterStatuses"
            label="Status"
            @change="filterHandler"
          ></v-select>
        </v-flex>
      </v-layout>
      <User v-for="user in users" :key="user.id" v-bind:user="user"/>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import User from "@/components/User";
export default {
  data() {
    return {
      users: Array,
      filterStatus: "all",
      filterStatuses: [
        { text: "Show all", value: "all" },
        { text: "Approved", value: "approved" },
        { text: "Not approved", value: "other" },
        { text: "Submitted", value: "Submitted" }
      ]
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/")
      .then(res => {
        this.users = res.data;
      })
      .catch(e => console.error(e));
  },
  methods: {
    filterHandler(e) {
      console.log(this.filterStatus);

      this.users = this.users
        .map(user => {
          const periods = user.periods.filter(
            period =>
              period.status.toUpperCase() === this.filterStatus.toUpperCase()
          );
          if (periods.length > 0) {
            return { ...user, periods };
          } else {
            return null;
          }
        })
        .filter(user => user !== null);
      console.log(this.users);
    }
  },
  components: {
    User
  }
};
</script>
