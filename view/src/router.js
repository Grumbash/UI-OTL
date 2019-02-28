import Vue from "vue";
import Router from "vue-router";
import Users from "./views/Users.vue";
import Projects from "./views/Projects.vue";
import Periods from "./views/Periods.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "users",
      component: Users
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/periods",
      name: "periods",
      component: Periods
    }
  ]
});
