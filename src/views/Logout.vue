<template></template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted: function () {
    // 保证作用域
    let commit = this.$store.commit;
    let router = this.$router;
    this.$confirm({
      title: "您真的要注销吗？",
      content: "注销后将跳转至登陆页面",
      onOk() {
        commit("logout");
        router.replace({
          path: "/login",
        });
      },
      onCancel() {
        if (window.history.length <= 1) {
          router.push({ path: "/" });
        } else {
          router.back();
        }
      },
    });
  },
});
</script>