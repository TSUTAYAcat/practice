<template>
  <div @click="show(msg)">{{msg}}</div>
</template>
<script>
import getAllName from "../js/es6";

export default {
  data() {
    return {
      msg: "你好！" + getAllName("李宁")
    };
  },
  methods: {
    show(msg) {
      alert(msg);
    }
  }
};
</script>
<style scoped>
 div {
     color: brown
 }
</style>