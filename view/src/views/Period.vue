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
          <td class="text-lg-center">{{ props.item.name }}</td>
          <td
            v-for="day in props.item.days"
            :key="day + Math.random() * Math.random()"
            class="text-lg-center"
          >{{ day }}</td>
          <td class="text-lg-center">{{ props.item.total }}</td>
          <td class="text-lg-center">
            <v-text-field v-model="Planned" type="text" label="HH" class="width-min"></v-text-field>
          </td>
          <td class="text-lg-center">{{ props.item.updatedAt }}</td>
          <td class="text-lg-center">
            <v-btn route :to="`/projects/${props.item.PO}`">Show</v-btn>
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

export default {
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
      Planned: ""
    };
  },
  mounted() {
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
