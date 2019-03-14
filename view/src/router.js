import Vue from "vue";
import Router from "vue-router";
import Users from "./views/Users.vue";
import User from "./views/User.vue";
import Projects from "./views/Projects.vue";
import Periods from "./views/Periods.vue";
import Period from "./views/Period.vue";
import Project from "./views/Project.vue";
import ProjectsUsers from "./views/ProjectsUsers.vue";
import Credentials from "./views/Credentials.vue";
import ProjectsNames from "./views/ProjectsNames.vue";

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
      path: "/users/:id",
      name: "user",
      component: User
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
    },
    {
      path: "/periods/:id",
      name: "period",
      component: Period
    },
    {
      path: "/projects/:PO",
      name: "project",
      component: Project
    },
    {
      path: "/periods/:id/projects",
      name: "projectsUsers",
      component: ProjectsUsers
    },
    {
      path: "/credentials",
      name: "credentials",
      component: Credentials
    },
    {
      path: "/projects-names",
      name: "projectsNames",
      component: ProjectsNames
    }
  ]
});
