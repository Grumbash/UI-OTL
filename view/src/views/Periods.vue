<template>
  <div class="periods">
    <h1 class="subheading grey--text">Periods</h1>
    <v-container class="my-5">content</v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      periods: Array
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/periods")
      .then(periods => console.log(periods.data))
      .catch(err => console.err(err));
  }
};
</script>
