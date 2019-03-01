<template>
  <div class="users">
    <h1 class="subheading grey--text">Users</h1>
    <v-container class="my-5">
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
      users: []
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
  components: {
    User
  }
};
</script>
