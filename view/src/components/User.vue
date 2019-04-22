<template>
  <div class="user-component my-4">
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Screenshot</v-card-title>

        <v-img :src="`data:image/png;base64, ${tempData}`" alt="Screensot for period"></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex class="show-original-data-user">
      <router-link :to="`/users/${testFunc._id}`" class="headline user-link">{{ testFunc.name }}</router-link>
      <v-btn color="info" @click.stop="openModal(user, $event)">Show original data</v-btn>
    </v-flex>

    <v-data-table
      v-if="testFunc.hasOwnProperty('updatedAt')"
      :items="testFunc.periods"
      :headers="headers"
      class="elevation-1"
      header-text="testFunc.name"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr @click="goTo(props.item._id)" class="table-row">
          <td class="text-lg-center">{{ props.item.from }} - {{ props.item.to }}</td>
          <td
            class="text-lg-center"
            :class="[
              props.item.status === 'Approved' ? 'green--text' : 'red--text'
            ]"
          >{{ props.item.status }}</td>
          <td class="text-lg-center">{{reduceTotal(props.item.projects)}}</td>
          <td class="text-lg-center">
            <v-btn color="info" @click.stop="openModal(props.item, $event)">
              <v-icon>collections</v-icon>
            </v-btn>
          </td>
          <td class="text-lg-center">{{props.item.updatedAt}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import Axios from "axios";
import constants from "@/constants";
export default {
  name: "Users",
  data() {
    return {
      headers: [
        { text: "Period" },
        { text: "Status" },
        { text: "Total hours" },
        { text: "Period sceenshot" },
        { text: "Updated at" }
      ],
      dialog: false,
      tempData: constants.imagePlaceholder
    };
  },
  computed: {
    testFunc() {
      if (!!this.user.updatedAt) {
        return {
          ...this.user,
          periods: this.user.periods.map(period => {
            const updatedAt = moment(period.updatedAt).format("lll");
            return { ...period, updatedAt };
          })
        };
      } else {
        return false;
      }
    }
  },
  methods: {
    reduceTotal(projects) {
      if (!!projects && !!projects.length) {
        return projects
          .map(proj => {
            return proj.total;
          })
          .reduce((accum, curr) => accum + curr);
      }
      return "NULL";
    },
    goTo(id) {
      this.$router.push(`/periods/${id}`);
    },
    async openModal(tempData, event) {
      try {
        let url = tempData.from
          ? `periods/${tempData._id}/screenshot`
          : `users/${tempData._id}/screenshot`;
        const { data } = await Axios.get(constants.api + url);
        this.tempData = data;
        this.dialog = true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  props: {
    user: Object
  }
};
</script>
<style scoped>
.user-link {
  color: #2196f3;
  caret-color: #2196f3;
  text-decoration: none;
  transition: all 0.3s;
}
.user-link:hover {
  color: #0d47a1;
}
.show-original-data-user {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.table-row {
  cursor: pointer;
}
</style>
