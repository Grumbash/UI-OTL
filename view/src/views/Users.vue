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
            @change="filterRequest"
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
import constants from "@/constants";
import moment from "moment";
export default {
  data() {
    return {
      users: Array,
      filterStatus: 0,
      filterStatuses: [
        { text: "Show all", value: 0 },
        { text: "Approved", value: 1 },
        { text: "Not approved", value: 2 }
      ]
    };
  },
  mounted() {
    axios
      .get(constants.api)
      .then(res => {
        this.users = res.data.map(user => {
          return {
            ...user,
            periods: user.periods.map(period => {
              const updatedAt = moment(period.updatedAt).format("lll");
              return { ...period, updatedAt };
            })
          };
        });
      })
      .catch(e => console.error(e));
  },
  methods: {
    filterRequest(e) {
      axios
        .post(constants.api, {
          filterStatus: this.filterStatus
        })
        .then(res => {
          this.users = res.data.map(user => {
            return {
              ...user,
              periods: user.periods.map(period => {
                const updatedAt = moment(period.updatedAt).format("lll");
                return { ...period, updatedAt };
              })
            };
          });
        })
        .catch(e => console.error(e));
    }
  },
  components: {
    User
  }
};
</script>
