<template>
  <div class="user-form">
    <v-container>
      <v-form ref="form">
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">SSO Credentials</div>
            <v-text-field
              v-model="cred.sso.login"
              data-vv-name="ssoLogin"
              v-validate="'required|email'"
              :error-messages="errors.collect('ssoLogin')"
              type="email"
              label="Login"
              required
            ></v-text-field>
            <v-text-field
              v-model="cred.sso.password"
              label="Password"
              type="password"
              data-vv-name="ssoPassword"
              v-validate="'required'"
              :error-messages="errors.collect('ssoPassword')"
              required
            ></v-text-field>
            <v-text-field v-model="cred.sso.newPassword" label="New password" type="password"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">VPN Credentials</div>
            <v-text-field
              v-model="cred.vpn.login"
              label="Login"
              type="text"
              v-validate="{required: true, regex: /^\D[\w]{5,}\_[\w]{2}$/}"
              data-vv-name="vpnLogin"
              :error-messages="errors.collect('vpnLogin')"
              required
            ></v-text-field>
            <v-text-field
              v-model="cred.vpn.password"
              v-validate="'required'"
              label="Password"
              type="password"
              data-vv-name="vpnPassword"
              :error-messages="errors.collect('vpnPassword')"
              required
            ></v-text-field>
            <v-text-field v-model="cred.vpn.newPassword" label="New password" type="password"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">Email</div>
            <v-text-field
              v-model="cred.emailToSubscribe"
              label="Email to subscribe"
              type="email"
              v-validate="'required|email'"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row align-start justify-center>
          <v-flex xs8>
            <div class="title">Expire date</div>
            <v-text-field
              v-validate="'date_format:MMDDYY'"
              v-model="cred.expireDate"
              type="text"
              label="MM/DD/YY"
              :mask="mask"
              data-vv-name="expireDate"
              :error-messages="errors.collect('expireDate')"
              required
            ></v-text-field>
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
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      response: "",
      mask: "##/##/##",
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
      },
      dictionary: {
        attributes: {
          ssoLogin: "SSO Login",
          expireDate: "Expire date",
          vpnLogin: "VPN Login"
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    async submit(e) {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return null;
        this.cred.expireDate = this.cred.expireDate.match(/.{1,2}/g).join("/");
        const { data } = await axios.post(
          `${constants.api}user-form`,
          this.cred
        );
        this.response = data;
        console.log(this.response);
      } catch (error) {
        console.error(error);
      }
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
        emailToSubscribe: "",
        expireDate: ""
      };
    }
  }
};
</script>
