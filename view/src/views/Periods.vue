<template>
  <div class="periods">
    <h1 class="subheading grey--text mb-3">Periods</h1>

    <p>
      <label class="grey--text">From</label>
      {{" "}}
      <input type="date" v-model="date.from">
    </p>
    <p>
      <label class="grey--text">To</label>
      {{" "}}
      <input type="date" v-model="date.to">
    </p>

    <v-container class="my-5">
      <v-data-table
        v-if="periods.length"
        :items="periods"
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
            <td class="text-lg-center">{{ props.item.from }} - {{ props.item.to }}</td>

            <td class="text-lg-center">
              <v-btn route :to="`periods/${props.item._id}/projects`">Show</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [{ text: "Period" }, { text: "Show data" }],
      periods: [],
      date: {
        from: "",
        to: ""
      }
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/periods")
      .then(periods => {
        this.periods = periods.data;
      })
      .catch(err => console.err(err));
  }
};
</script>
