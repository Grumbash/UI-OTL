import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
Vue.use(Vuetify, {
  iconfont: "md"
});
