<template>
  <div class="users">
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">SSO Credentials</div>
            <v-text-field v-model="cred.sso.login" label="Login" required></v-text-field>
            <v-text-field v-model="cred.sso.password" label="Password" required></v-text-field>
            <v-text-field v-model="cred.sso.newPassword" label="New password" required></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">VPN Credentials</div>
            <v-text-field v-model="cred.vpn.login" label="Login" required></v-text-field>
            <v-text-field v-model="cred.vpn.password" label="Password" required></v-text-field>
            <v-text-field v-model="cred.vpn.newPassword" label="New password" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">Email</div>
            <v-text-field v-model="cred.emailToSubscribe" label="Email to subscribe" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">Expire date</div>
            <v-text-field
              v-validate="'date_format:DD/MM/YYYY'"
              v-model="cred.expireDate"
              label="mm/dd/yy"
              name="ExpireDate"
              required
            ></v-text-field>
            <span>{{ errors.first('ExpireDdate') }}</span>
          </v-flex>
        </v-layout>
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <v-btn @click="submit" class="green darken-2 white--text">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import constants from "@/constants";
export default {
  data() {
    return {
      valid: true,
      cred: {
        sso: {
          login: "",
          password: "",
          newPassword: ""
        },
        vpn: {
          login: "",
          password: "",
          newPassword: ""
        },
        emailToSubscribe: "",
        expireDate: ""
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    submit(e) {
      axios
        .post(`${constants.api}user-form`, this.cred)
        .then(res => {
          this.user = res.data;
        })
        .catch(error => console.error(error));
    },
    clear(e) {
      this.cred = {
        sso: {
          login: "",
          password: "",
          newPassword: ""
        },
        vpn: {
          login: "",
          password: "",
          newPassword: ""
        },
        emailToSubscribe: ""
      };
    }
  }
};
</script>
