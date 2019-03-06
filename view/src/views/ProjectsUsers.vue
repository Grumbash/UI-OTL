<template>
  <div class="projectsUsers" v-if="projects.length">
    <h1
      class="display-1 grey--text mb-5"
    >Period: {{projects[0].period.from}} - {{projects[0].period.to}}</h1>
    <ProjectUsers v-for="project in projects" :key="project.id" v-bind:project="project"/>
  </div>
</template>

<script>
import axios from "axios";
import ProjectUsers from "@/components/ProjectUsers";

export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/periods/${this.$route.params.id}/projects`)
      .then(res => {
        this.projects = res.data;
      })
      .catch(e => console.error(e));
  },
  components: {
    ProjectUsers
  }
};
</script>


