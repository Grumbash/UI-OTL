<template>
  <p>lol</p>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios
      .get(`http://localhost:3000/periods/${this.$route.params.id}/projects`)
      .then(res => console.log(res.data))
      .catch(e => console.error(e));
  }
};
</script>

