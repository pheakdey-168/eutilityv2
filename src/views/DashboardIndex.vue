<template>
  <div id="app">
    <v-app id="inspire" class="custom_theme">
      <div
        v-if="
          (app == '' && my_part == '/en') || (app == '' && my_part == '/en/') || (app == '' && my_part == '/kh') || (app == '' && my_part == '/kh/')
        "
      >
       <HeaderApp />
      </div>
      <div v-else>
        <HeaderApp />
      </div>
      <v-main>
        <router-view />
        <vue-snotify />
        <!-- <Footer/> -->
        <Resource />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import HeaderApp from "@/components/HeaderApp.vue";
// import HeaderApp from "@/components/HeaderApp.vue";
// import Footer from '@/components/Footer'
import { data } from "@/observable/store";
// import { payroll_timesheet_get } from "../api/payroll";
const instituteHandler = require("@/scripts/instituteHandler.js");

export default {
  name: "DashboardIndex",
  components: {
    // Header,
    HeaderApp,
    // Footer
    Resource: () => import("@/components/Resource"),
  },
  data: () => ({
    my_part: "",
  }),
  created() {
    // Initial Institute
    instituteHandler.init();
  },
  methods: {
    checkRoute2() {
      // window.console.log("check route2");
      let part = window.location.pathname;
      this.my_part = part;
      if (part == "/en" || part == "/en/" || part == "/kh" || part == "/kh/") {
        data.app = "";
        localStorage.setItem("app_type", "");
      } else {
        data.app = localStorage.getItem("app_type");
      }
    },
  },
  computed: {
    app() {
      return data.app;
    },
    part() {
      return window.location.pathname;
    },
  },
  watch: {
    $route: "checkRoute2",
  },
  mounted() {
    this.checkRoute2();
  },
};
</script>
