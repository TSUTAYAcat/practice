<template>
  <div id="mainTabbar">
    <Tabbar>
      <tabbar-item path="/home">
        <div slot="icon">
          <img style="width:20px;height:20px;margin-top:3px" src="../../assets/img/tabbar/首页.png" alt />
        </div>
        <div slot="icon_active">
          <img style="width:18px;height:18px;margin-top:3px" src="../../assets/img/tabbar/首页.png" alt />
        </div>
        <div style="font-size:16px" slot="des">首页</div>
      </tabbar-item>
      <tabbar-item path="/category">
        <div slot="icon">
          <img style="width:20px;height:20px;margin-top:3px" src="../../assets/img/tabbar/分类.png" alt />
        </div>
        <div slot="icon_active">
          <img style="width:18px;height:18px;margin-top:3px" src="../../assets/img/tabbar/分类.png" alt />
        </div>
        <div style="font-size:16px,margin-bottom:2px" slot="des">分类</div>
      </tabbar-item>
      <tabbar-item path="/cart">
        <div slot="icon">
          <img style="width:20px;height:20px;margin-top:3px" src="../../assets/img/tabbar/购物车.png" alt />
        </div>
        <div slot="icon_active">
          <img style="width:18px;height:18px;margin-top:3px" src="../../assets/img/tabbar/购物车.png" alt />
        </div>
        <div style="font-size:16px" slot="des">购物车</div>
      </tabbar-item>
      <tabbar-item path="/profile">
        <div slot="icon">
          <img style="width:20px;height:20px;margin-top:3px" src="../../assets/img/tabbar/我的.png" alt />
        </div>
        <div slot="icon_active">
          <img style="width:18px;height:18px;margin-top:3px" src="../../assets/img/tabbar/我的.png" alt />
        </div>
        <div style="font-size:16px" slot="des">我的</div>
      </tabbar-item>
    </Tabbar>
  </div>
</template>
<script>
import Tabbar from "./Tabbar.vue";
import TabbarItem from "./TabbarItem.vue";

export default {
  name: "mainTabbar",
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>
<style>
</style>