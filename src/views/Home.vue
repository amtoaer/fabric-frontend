<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <button v-on:click="loading = !loading">test</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Progress from "@/components/Progress.vue";

export default Vue.extend({
  name: "Home",
  components: {
    HelloWorld,
  },
  data: function () {
    return {
      loading: true,
    };
  },
});
</script>
