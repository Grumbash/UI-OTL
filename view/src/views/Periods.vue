<template>
  <div class="periods">
    <h1 class="heading grey--text mb-3">Periods</h1>
    <v-container grid-list-md>
      <v-layout row align-end justify-center>
        <v-flex xs2>
          <v-select v-model="date.nowMonth" :items="date.month" label="Month" @change="changeMonth"></v-select>

          <v-select v-model="date.nowYear" :items="date.year" @change="changeYear" label="Year"></v-select>
          <v-btn v-if="!allPeriods" @click="changeFullPeriods" color="info">Show All</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row align-start justify-center>
        <v-flex v-if="allPeriods" xs8>
          <v-data-table
            v-if="periods.length"
            :items="periods"
            :headers="headers"
            class="elevation-1"
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
                  <v-btn route :to="`/periods/${props.item._id}/projects`">Show</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex v-else xs8>
          <v-data-table
            v-if="periodsInMonth.length"
            :items="periodsInMonth"
            :headers="headers"
            class="elevation-1"
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
                  <v-btn route :to="`/periods/${props.item._id}/projects`">Show</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import constants from "@/constants";

export default {
  data() {
    return {
      headers: [{ text: "Period" }, { text: "Show data" }],
      periods: [],
      periodsInMonth: [],
      date: {
        month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        year: ["19", "20", "21", "22"],
        nowMonth: moment().format("M"),
        nowYear: moment().format("YY")
      },
      allPeriods: true
    };
  },
  mounted() {
    axios
      .get(`${constants.api}periods`)
      .then(periods => {
        this.periods = periods.data;
      })
      .catch(err => console.err(err));
  },
  methods: {
    changeMonth(e) {
      this.periodsInMonth = this.periods.filter(period => {
        const periodFrom = period.from.split("/")[0];
        const periodTo = period.to.split("/")[0];
        if (
          periodFrom == this.date.nowMonth ||
          periodTo == this.date.nowMonth
        ) {
          return true;
        } else {
          return false;
        }
      });
      this.allPeriods = false;
    },
    changeYear(e) {
      this.periodsInMonth = this.periods.filter(period => {
        const periodFrom = period.from.split("/")[2];
        const periodTo = period.to.split("/")[2];
        if (periodFrom == this.date.nowYear || periodTo == this.date.nowYear) {
          return true;
        } else {
          return false;
        }
      });
      this.allPeriods = false;
    },
    changeFullPeriods(e) {
      this.date.nowYear = moment().format("YY");
      this.date.nowMonth = moment().format("M");
      this.allPeriods = !this.allPeriods;
    }
  }
};
</script>
