<template>
  <div>
    <div v-if="projects.length" class="headline grey--text">PO: {{projects[0].PO}}</div>
    <div v-if="projects.length" class="title grey--text">Project name: {{projects[0].name}}</div>
    <v-data-table v-if="projects.length" :items="projects" :headers="headers" class="elevation-1">
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-lg-center">{{ props.item.period.user.name }}</td>
          <td class="text-lg-center">
            <v-btn route :to="`/users/${props.item.period.user._id}`">Show</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [{ text: "E-mail" }, { text: "Show" }],
      projects: []
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/projects/${this.$route.params.PO}`)
      .then(projects => {
        this.projects = projects.data;
      })
      .catch(err => console.error(err));
  }
};
</script>
