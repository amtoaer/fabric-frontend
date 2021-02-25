<template>
  <a-layout id="components-layout-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
      >
        <a-sub-menu v-for="submenu in sidebar" :key="submenu.key">
          <span slot="title"
            ><a-icon :type="submenu.icon" />{{ submenu.title }}</span
          >
          <a-menu-item v-for="menu in submenu.menus" :key="menu.key">
            <router-link :to="menu.path">
              <a-icon :type="menu.icon" />
              <span>{{ menu.text }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '350px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Layout, Menu, Icon } from "ant-design-vue";

Vue.use(Layout).use(Menu).use(Icon);

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
  },
  mounted: function () {
    // easy for debug
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
    }
  },
});
</script>

<style>
#components-layout-custom-trigger {
  width: 100%;
  height: 100%;
}

#components-layout-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>