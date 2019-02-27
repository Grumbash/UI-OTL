<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-data-table class="striped centered" :items="users">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.petiods }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    users: []
  }),
  mounted() {
    axios
      .get("http://localhost:3000")
      .then(users => {
        this.users = users.data;
        console.log(users.data);
      })
      .catch(e => console.log(e));
  }
};
</script>

<style></style>
