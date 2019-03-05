<template>
  <div>
    <form>
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
      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
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
          // custom attributes
        }
      },
      response: {
        message: "",
        status: ""
      }
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
          console.log("fafa");
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
    }
  }
};
</script>
