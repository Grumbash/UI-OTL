<template>
  <div>
    <div class="display-1 grey--text">
      <router-link :to="`/users/${dUser._id}`">{{ dUser.name }}</router-link>
    </div>
    <v-data-table
      v-if="dUser"
      :items="dUser.periods"
      :headers="headers"
      class="elevation-1"
      header-text="user.name"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-lg-center">{{ props.item.from }} - {{ props.item.to }}</td>
          <td
            class="text-lg-center"
            :class="[
              props.item.status === 'Approved' ? 'green--text' : 'red--text'
            ]"
          >{{ props.item.status }}</td>
          <td
            class="text-lg-center"
          >{{props.item.projects.map(proj=>proj.total).reduce((accum, curr)=>accum+curr)}}</td>
          <td class="text-lg-center">{{props.item.updatedAt}}</td>
          <td class="text-lg-center">
            <v-btn route :to="`/periods/${props.item._id}`">Show</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      headers: [
        { text: "Period" },
        { text: "Status" },
        { text: "Total hours" },
        { text: "Updated at" },
        { text: "Show data" }
      ],
      dUser: {
        ...this.user,
        periods: this.user.periods.map(period => {
          const updatedAt = moment(period.updatedAt).format("lll");
          return { ...period, updatedAt };
        })
      }
    };
  },
  props: {
    user: Object
  }
};
</script>
