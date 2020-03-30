<template>
  <div id="tabbarItem" @click="jumpTo">
    <div v-if="!isActive">
      <slot name="icon"></slot>
    </div>
    <div v-else>
      <slot name="icon_active"></slot>
    </div>
    <div :style="isActive">
      <slot name="des"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbar",
  props: {
    path: String
  },
  data() {
    return {};
  },
  methods: {
    jumpTo() {
      this.$router.replace(this.path);
    }
  },
  computed: {
    isActive() {
      if (this.$route.path === "/" && this.path === "/home") {
        return { color: "blue" };
      }
      return this.$route.path.indexOf(this.path) === -1
        ? null
        : { color: "blue" };
    }
  }
};
</script>
<style>
#tabbarItem {
  flex: 1;
  height: 49px;
  text-align: center;
}
.active {
  color: blue;
}
</style>