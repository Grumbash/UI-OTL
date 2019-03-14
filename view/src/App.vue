<template>
  <v-app>
    <Navbar v-if="this.$route.name !== 'auth'" />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
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
    if(!(!!localStorage.jwt)){
      this.$router.push('/auth');
    }
    else{
      axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.jwt;
      this.$router.push('/users')
    }
  }
};
</script>
