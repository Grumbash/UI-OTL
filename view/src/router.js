import Vue from "vue";
import Router from "vue-router";
import Users from "./views/Users.vue";
import User from "./views/User.vue";
import Projects from "./views/Projects.vue";
import Periods from "./views/Periods.vue";
import Period from "./views/Period.vue";
import Project from "./views/Project.vue";
import Auth from "./views/Auth.vue";
import ProjectsUsers from "./views/ProjectsUsers.vue";
import Credentials from "./views/Credentials.vue";
import ProjectsNames from "./views/ProjectsNames.vue";
import UserForm from "./views/UserForm.vue";
import ProjectUsers from "./views/ProjectUser.vue";
import decode from "jwt-decode";

const accessController = (to, from, next) => {
  const { role } = decode(localStorage.jwt);
  if (!!role && role === "admin") {
    next();
  } else {
    next("/user-form");
  }
};

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/users",
      name: "users",
      component: Users,
      beforeEnter: accessController
    },
    {
      path: "/users/:id",
      name: "user",
      component: User,
      beforeEnter: accessController
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
      beforeEnter: accessController
    },
    {
      path: "/periods",
      name: "periods",
      component: Periods,
      beforeEnter: accessController
    },
    {
      path: "/periods/:id",
      name: "period",
      component: Period,
      beforeEnter: accessController
    },
    {
      path: "/projects/:PO",
      name: "project",
      component: Project,
      beforeEnter: accessController
    },
    {
      path: "/projects/:PO/users/:id",
      component: ProjectUsers,
      name: "projectUsers",
      beforeEnter: accessController
    },
    {
      path: "/periods/:id/projects",
      name: "projectsUsers",
      component: ProjectsUsers,
      beforeEnter: accessController
    },
    {
      path: "/credentials",
      name: "credentials",
      component: Credentials,
      beforeEnter: accessController
    },
    {
      path: "/projects-names",
      name: "projectsNames",
      component: ProjectsNames,
      beforeEnter: accessController
    },
    {
      path: "/user-form",
      name: "userForm",
      component: UserForm
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth
    }
  ]
});

export default router;
