<template>
  <div id="app">
    <router-view></router-view>
    <MainTabbar />
  </div>
</template>
<script>
import MainTabbar from "@/components/tabbar/MainTabbar.vue";

export default {
  name: "app",
  components: {
    MainTabbar
  }
};
</script>
<style>
</style>
