<template>
  <div class="project-users">
    <v-container>
      <v-layout row align-start justify-center>
        <v-flex xs6>
          <p class="display-1 d-inline-block">
            Table user for the project
            <strong
              class="project-name text--darken-2"
            >{{project.uiNameForRead || project.uiName || project.name}}</strong>
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="my-5">
      <User :key="user.id" v-bind:user="user"/>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import constants from "@/constants";
import User from "@/components/User";
export default {
  data() {
    return {
      user: {},
      project: {}
    };
  },
  mounted() {
    const { PO, id } = this.$route.params;
    axios
      .get(`${constants.api}projects/${PO}/users/${id}`)
      .then(res => {
        const { data } = res;
        this.user = data;
      })
      .catch(e => console.error(e));
    axios
      .get(`${constants.api}projects/${PO}`)
      .then(res => {
        const { data } = res;
        this.project = data[0];
      })
      .catch(e => console.error(e));
  },
  components: {
    User
  }
};
</script>

<style scoped>
.project-name {
  color: #2196f3;
}
</style>
