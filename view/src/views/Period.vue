<template>
  <div>
    <h1 class="subheading">From:{{period.from}}-To:{{period.to}}</h1>
    <v-data-table
      v-if="period.projects"
      :items="period.projects"
      :headers="headers"
      class="elevation-1"
      hide-actions
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-lg-center">{{ props.item.PO }}</td>
          <td class="text-lg-center"><router-link :to="`/projects/${props.item.PO}`">{{ props.item.name }}</router-link></td>
          <td
            v-for="day in props.item.days"
            :key="day + Math.random() * Math.random()"
            class="text-lg-center"
          >{{ day }}</td>
          <td class="text-lg-center">{{ props.item.total }}</td>
          <td class="text-lg-center">
            {{ props.item.planned }}
          </td>
          <td class="text-lg-center">{{ props.item.updatedAt }}</td>
          <td class="text-lg-center">
             <v-menu
              v-model="menu[props.item._id]"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  v-on="on"
                >
                  Setting
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Planned number of hours</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-text-field v-model="planned" type="text" label="HH"></v-text-field>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn flat @click="cancel(props.item._id)">Cancel</v-btn>
                  <v-btn color="primary" flat @click="save(props.item._id)">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import constants from "@/constants";
import Vue from "vue";

export default {
  name: "Period",
  data() {
    return {
      period: Object,
      headers: [
        { text: "PO" },
        { text: "Project Name" },
        { text: "Saturday" },
        { text: "Sunday" },
        { text: "Monday" },
        { text: "Tuesday" },
        { text: "Wednesday" },
        { text: "Thursday" },
        { text: "Friday" },
        { text: "Total" },
        { text: "Planned" },
        { text: "Updated at" },
        { text: "View" }
      ],
      menu: {},
      planned: ""
    };
  },
  methods: {
    save: function(id){
      let project = this.period.projects.filter(proj => id === proj._id)[0];
      let body = {
        id,
        planned: this.planned
      }
      axios
      .post(`${constants.api}projects/planned-hours`,body)
      .then(response=>{
        project.planned =  response.data.planned;
      })
      .catch(error => {
        console.log(error);
      })
      this.planned = "";
    },
    cancel: function(id){
      this.menu[id] = false;
      this.planned = ""
    }
  },
  mounted() {
    var self = this;
    axios
      .get(`${constants.api}periods/${this.$route.params.id}`)
      .then(periodRequest => {
        const pattern = "llll";
        const { data } = periodRequest;
        data.updatedAt = moment(data.updatedAt).format(pattern);
        data.projects = data.projects.map(elem => {
          elem.updatedAt = moment(elem.updatedAt).format(pattern);
          elem.createdAt = moment(elem.createdAt).format(pattern);
          return elem;
        });
        this.period = data;
        data.projects.forEach(element => {
          Vue.set(self.menu,element._id,false)
        });
      })
      .catch(e => console.error(e));
  }
};
</script>

<style scoped>
.width-min {
  width: 15%;
  margin: 0 auto;
}
</style>
