<template>
  <div class="projectsNames">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline">Change project's fields</v-card-title>

        <v-container>
          <v-flex class="input-box">
            <v-text-field
              v-model="projectInfo.uiName"
              name="ProjectSMGName"
              label="Change SMG name"
            ></v-text-field>
          </v-flex>
        </v-container>

        <v-container>
          <v-flex class="input-box">
            <v-text-field
              v-model="projectInfo.uiNameForRead"
              name="ProjectReadableName"
              label="Change readable name"
            ></v-text-field>
          </v-flex>
        </v-container>

        <v-container>
          <v-flex class="input-box">
            <v-text-field v-model="projectInfo.PM" name="ProjectPMName" label="Change PM name"></v-text-field>
          </v-flex>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="info" flat="flat" @click="dialog = false">Cancel</v-btn>

          <v-btn color="success" flat="flat" @click="sendRequestToChangeUIName">Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-data-table v-if="projects.length" :items="projects" :headers="headers" class="elevation-1">
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-lg-center">{{ props.item.name }}</td>
            <td class="text-lg-center">{{ props.item.uiName }}</td>
            <td class="text-lg-center">{{ props.item.uiNameForRead }}</td>
            <td class="text-lg-center">{{ props.item.PM }}</td>

            <td class="text-lg-center">
              <v-btn @click.stop="openModal(props.item, $event)" dark color="info">Open</v-btn>
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
      projectInfo: {},
      dialog: false,
      headers: [
        { text: "OTL Project Name" },
        { text: "SMG Project Name" },
        { text: "Readable Project Name" },
        { text: "PM" },
        { text: "Customize" }
      ],
      projects: []
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      axios
        .get(`${constants.api}projects`)
        .then(res => {
          this.projects = res.data;
        })
        .catch(e => console.error(e));
    },
    sendRequestToChangeUIName() {
      this.dialog = false;
      axios
        .post(`${constants.api}projects`, this.projectInfo)
        .then(res => {
          this.projects = res.data;
        })
        .catch(e => console.error(e));
    },
    openModal(projectData, event) {
      this.dialog = true;
      this.projectInfo = projectData;
      console.log(this.projectInfo);
    }
  }
};
</script>
