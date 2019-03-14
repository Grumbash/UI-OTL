<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">otl</span>
        <span>View</span>

      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn right color="warning" @click="logout">Logout</v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">
              {{
              link.text
              }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "supervisor_account", text: "Users", route: "/users" },
        { icon: "date_range", text: "Periods", route: "/periods" },
        { icon: "view_list", text: "Projects", route: "/projects" },
        {
          icon: "find_replace",
          text: "Projects Names",
          route: "/projects-names"
        },
        { icon: "vpn_key", text: "Credentials", route: "/credentials" }
      ]
    };
  },
  methods: {
    logout: function(){
      if(!!localStorage.jwt){
        localStorage.removeItem('jwt');
        this.$router.push('auth');
      }
    }
  }
};
</script>
