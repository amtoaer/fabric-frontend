<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Index</router-link> |
      <router-link to="/Login">Login</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted: function () {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("user") === null
    ) {
      this.$msg.error("您还未登录，正在跳转至登陆界面...");
      this.$router.replace({
        path: "/login",
      });
    } else {
      this.$store.commit(
        "setUser",
        JSON.parse(localStorage.getItem("user") as string)
      );
    }
  },
});
</script>