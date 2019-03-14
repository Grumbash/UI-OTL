<<template>
    <div class="wrapper">
    <div class="centered-container">
        <p class="red--text" 
            v-if="!!error">
            {{error}}
        </p>
        <v-flex 
        class="input-box">
            <v-text-field
                v-model="login"
                name="login"
                label="Login"
            ></v-text-field>
            </v-flex>

        <v-flex 
        class="input-box">
            <v-text-field
                v-model="password"
                name="password"
                label="Password"
                :type="'password'"
            ></v-text-field>
        </v-flex>
        <v-btn 
        class="input-box"
        color="success"
        @click="signIn">Sign In</v-btn>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import constants from "@/constants";
export default {
  name: 'Authorization',
  data() {
    return {
        login: '',
        password:'',
        error:''
    };
  },
  methods: {
      signIn: function(){
          if(!!this.login && !!this.password){
            axios
            .post(`${constants.api}auth/login`,{
                login: this.login,
                password: this.password
            })
            .then(res => {
                if(res.status === 200){
                    localStorage.removeItem('jwt');
                    localStorage.setItem('jwt',res.data);
                    this.$router.push('users');
                    this.error = ''
                }
            })
            .catch(e => this.error = e.response.data);  
          }
      }
  },
  mounted: function(){
      if(!!localStorage.jwt){
      this.$router.push('/users');
    }
  }
};
</script>

<style>
.wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}
.centered-container{
    width:500px;
    margin: 0;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.input-box{
    padding: 0;
    margin: 10px 0;
}
</style>
