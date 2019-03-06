<template>
  <div>
    <v-container grid-list-md>
      <form>
        <v-layout row align-end justify-center>
          <v-flex xs5>
            <h1 class="headline">Credentials form</h1>

            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="E-mail"
              data-vv-name="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              label="Password"
              data-vv-name="password"
              required
              type="password"
            ></v-text-field>
            <div
              v-if="response.status"
              :class="[
              response.status === 'succeed' ? 'green--text' : 'red--text'
            ]"
            >
              <p>{{response.status}}</p>
              <p>{{response.message}}</p>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row align-end justify-center>
          <v-flex xs1>
            <v-btn @click="submit" color="success">add/update</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn @click.stop="dialog = true" dark color="error">remove user</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-container>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline">Do you want to remove this user?</v-card-title>

        <v-card-text>User history will remain but will no longer be updated. If you want to update the data just fill it in the form.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>

          <v-btn color="error" flat="flat" @click="removeUser">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      email: "",
      password: "",
      dictionary: {
        attributes: {
          email: "E-mail Address",
          password: "Password"
        }
      },
      response: {
        message: "",
        status: ""
      },
      dialog: false
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    async submit() {
      try {
        const isValid = await this.$validator.validateAll();
        if (isValid) {
          axios
            .post("http://localhost:3000/creds", {
              email: this.email,
              password: this.password
            })
            .then(res => {
              console.log(res.data);
              this.response = res.data;
              this.clear();
            })
            .catch(e => {
              console.error(e);
              this.response = {
                message: e,
                status: "Error"
              };
            });
        } else {
          this.response = {
            message: "Please, check inputs and put valid data",
            status: "Invalid inputs"
          };
        }
      } catch (error) {
        console.error(error);
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.$validator.reset();
    },
    removeUser() {
      axios.delete();
      this.clear();
    }
  }
};
</script>
