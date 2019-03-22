<template>
  <div class="user-component my-4">
    <router-link :to="`/users/${testFunc._id}`" class="headline user-link">{{ testFunc.name }}</router-link>
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
        <tr @click="goTo(props.item._id)">
          <td class="text-lg-center">{{ props.item.from }} - {{ props.item.to }}</td>
          <td
            class="text-lg-center"
            :class="[
              props.item.status === 'Approved' ? 'green--text' : 'red--text'
            ]"
          >{{ props.item.status }}</td>
          <td class="text-lg-center">{{reduceTotal(props.item.projects)}}</td>
          <td class="text-lg-center">{{props.item.updatedAt}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Users",
  data() {
    return {
      headers: [
        { text: "Period" },
        { text: "Status" },
        { text: "Total hours" },
        { text: "Updated at" }
      ]
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
      if (!!projects.length) {
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
</style>
