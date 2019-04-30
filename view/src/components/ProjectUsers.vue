<template>
  <div>
    <div v-if="project" class="headline grey--text">PO: {{project.PO}}</div>
    <div
      v-if="project"
      class="title grey--text"
    >Project name: {{project.uiNameForRead || project.uiName || project.name}}</div>
    <v-data-table v-if="project" :items="project.users" :headers="headers" class="elevation-1">
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-lg-center">{{ props.item.name }}</td>

          <td class="text-lg-center">
            <v-btn route :to="`/users/${props.item._id}`">Show</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Projectusers",
  data() {
    return {
      headers: [{ text: "Name" }, { text: "Show user" }]
    };
  },
  props: {
    project: Object
  }
};
</script>

