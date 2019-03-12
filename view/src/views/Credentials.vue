<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline">Do you want to remove this user?</v-card-title>

        <v-card-text>User's history will remain but will no longer be updated. If you want to update password just fill it in the form.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>

          <v-btn color="error" flat="flat" @click="removeUser">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container grid-list-md>
      <v-layout row align-end justify-center>
        <v-flex xs5>
          <v-data-table v-if="logins.length" :items="logins" :headers="headers" class="elevation-1">
            <template slot="headers" slot-scope="props">
              <tr>
                <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr :key="props.item._id">
                <td class="text-lg-center">{{ props.item.login }}</td>
                <td class="text-lg-center">
                  <v-btn @click.stop="openModal(props.item, $event)" dark color="error">
                    <v-icon>cancel</v-icon>
                  </v-btn>
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
import constants from "@/constants";
export default {
  data() {
    return {
      headers: [{ text: "User's name" }, { text: "Remove user" }],
      logins: [],
      response: {
        message: "",
        status: ""
      },
      dialog: false,
      userToRemove: {}
    };
  },
  mounted() {
    this.getAllCreds();
  },

  methods: {
    getAllCreds() {
      axios
        .get(`${constants.api}creds`)
        .then(res => {
          this.logins = res.data;
        })
        .catch(e => console.error(e));
    },
    removeUser() {
      axios.delete(`${constants.api}creds/${this.userToRemove._id}`);
      console.log(this.userToRemove);
      this.dialog = false;
    },
    openModal(userData, event) {
      this.dialog = true;
      this.userToRemove = userData;
    }
  }
};
</script>
