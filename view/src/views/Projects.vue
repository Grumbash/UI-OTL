<template>
  <div class="projects">
    <v-container class="my-5">
      <v-data-table v-if="projects.length" :items="projects" :headers="headers" class="elevation-1">
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-lg-center">{{ props.item.PO }}</td>
            <td
              class="text-lg-center"
            >{{ !!props.item.uiNameForRead ? props.item.uiNameForRead : '' }}</td>
            <td class="text-lg-center">{{ !!props.item.uiName ? props.item.uiName : '' }}</td>
            <td class="text-lg-center">{{ props.item.name }}</td>
            <td class="text-lg-center">{{ !!props.item.PM ? props.item.PM : '' }}</td>
            <td class="text-lg-center">
              <v-btn route :to="`/projects/${props.item.PO}`">Show</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import constants from "@/constants";
export default {
  data() {
    return {
      headers: [
        { text: "PO" },
        { text: "Readable name" },
        { text: "SMG Name" },
        { text: "OTL Name" },
        { text: "PM " },
        { text: "Show" }
      ],
      projects: []
    };
  },
  mounted() {
    axios
      .get(`${constants.api}projects`)
      .then(res => {
        this.projects = res.data;
      })
      .catch(e => console.error(e));
  }
};
</script>
