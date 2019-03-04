<template>
  <h1>Project</h1>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get(`http://localhost:3000/projects/${this.$route.params.PO}`)
      .then(projects => console.log(projects.data))
      .catch(err => console.error(err));
  }
};
</script>
