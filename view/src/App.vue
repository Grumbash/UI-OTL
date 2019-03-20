<template>
  <v-app>
    <Navbar v-if="this.$route.name !== 'auth'"/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import constants from "@/constants";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
    };
  },
  created: function() {
    var self = this;
    if (!!!localStorage.jwt) {
      this.$router.push("/auth");
    } else {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.jwt;
      axios
        .get(`${constants.api}`)
        .then(res => {
          self.$router.push(
            self.$route.path !== "/" ? self.$route.path : "/users"
          );
        })
        .catch(e => {
          if (e.response.status === 401) {
            self.$router.push("/auth");
          } else {
            console.log(e);
          }
        });
    }
  }
};
</script>
