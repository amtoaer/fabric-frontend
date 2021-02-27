<template>
  <a-layout id="layout" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-open-keys="['sub1']"
        :selectedKeys="currentKey"
      >
        <a-sub-menu v-for="submenu in sidebar" :key="submenu.key">
          <span slot="title"
            ><a-icon :type="submenu.icon" /><span>{{
              submenu.title
            }}</span></span
          >
          <a-menu-item
            v-for="menu in submenu.menus"
            :key="menu.key"
            @click="() => {}"
          >
            <router-link :to="menu.path">
              <a-icon :type="menu.icon" />
              <span>{{ menu.text }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
      <a-layout-content
        :style="{
          margin: '16px',
          padding: '24px',
          background: '#fff',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {
      collapsed: false,
      sidebar: [
        {
          title: "用户功能",
          key: "sub1",
          icon: "user",
          menus: [
            { key: "1", path: "/login", icon: "login", text: "登录" },
            { key: "2", path: "/register", icon: "user-add", text: "注册" },
          ],
        },
      ],
      currentKey: ["1"],
    };
  },
  watch: {
    "$store.state.isLogin": function (val: Boolean) {
      if (val) {
        this.sidebar = [
          {
            title: "病历操作",
            key: "sub1",
            icon: "snippets",
            menus: [
              { key: "1", path: "/", icon: "search", text: "查询" },
              { key: "2", path: "/add", icon: "file-add", text: "添加" },
            ],
          },
          {
            title: "用户中心",
            key: "sub2",
            icon: "user",
            menus: [
              { key: "3", path: "/me", icon: "meh", text: "我的" },
              { key: "4", path: "/logout", icon: "logout", text: "注销" },
            ],
          },
        ];
      } else {
        this.sidebar = [
          {
            title: "用户功能",
            key: "sub1",
            icon: "user",
            menus: [
              { key: "1", path: "/login", icon: "login", text: "登录" },
              { key: "2", path: "/register", icon: "user-add", text: "注册" },
            ],
          },
        ];
      }
    },
    "$route.name": function (val: string) {
      switch (val) {
        case "Login":
        case "Index":
        case "Detail":
          this.currentKey = ["1"];
          break;
        case "Add":
        case "Register":
          this.currentKey = ["2"];
          break;
        case "Info":
          this.currentKey = ["3"];
          break;
        case "Logout":
          this.currentKey = ["4"];
          break;
      }
    },
  },
  mounted: function () {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("user") === null
    ) {
      this.$msg.error("您还未登录，正在跳转至登录界面...");
      this.$router.replace({
        path: "/login",
      });
    } else {
      this.$store.commit(
        "setUser",
        JSON.parse(localStorage.getItem("user") as string)
      );
      this.$router.replace({
        path: "/",
      });
    }
  },
});
</script>

<style>
#layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>