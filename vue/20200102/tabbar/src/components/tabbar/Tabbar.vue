<template>
  <div id="tabbar">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name:"tabbar",
}
</script>
<style>
@import url("../../assets/css/base.css");
#tabbar {
  width: 100%;
  /* height: 49px; */
  display: flex;
  flex-direction: row;
  background-color: #f2f2f2;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(200, 200, 200, 0.8);
}
</style>