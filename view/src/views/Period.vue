<template>
  <h1>Test</h1>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      period: Object
    };
  },
  props: {
    periodId: String
  },
  mounted() {
    console.log($route.params.id);
    // axios.get("http://localhost:3000/"+{{ $route.params.id }}).then
  }
};
</script>
