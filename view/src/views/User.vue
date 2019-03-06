<template>
  <div class="users">
    <v-container class="my-5">
      <User :key="user.id" v-bind:user="user"/>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import User from "@/components/User";
export default {
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/users/${this.$route.params.id}`)
      .then(res => {
        this.user = res.data;
      })
      .catch(error => console.error(error));
  },
  components: {
    User
  }
};
</script>
