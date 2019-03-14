<<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Login"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRulles"
      label="Password"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
import axios from "axios";
import constants from "@/constants";
export default {
  data() {
    return {
        name: '',
        password:''
    };
  },
  mounted() {
  },

  methods: {

  }
};
</script>