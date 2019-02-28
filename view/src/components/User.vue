<template>
  <div>
    <div class="display-1 grey--text">{{user.name}}</div>
    <v-data-table
      v-if="user"
      :items="user.periods"
      :headers="headers"
      selec-all
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
          <td class="text-lg-center">{{props.item.from}} - {{props.item.to}}</td>
          <td class="text-lg-center">{{props.item.status}}</td>
          <td class="text-lg-center">
            <v-btn route :to="`projects/${props.item._id}`">Show</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [{ text: "Period" }, { text: "Status" }, { text: "Show data" }]
    };
  },
  props: {
    user: Object
  }
};
</script>

<style>
</style>
