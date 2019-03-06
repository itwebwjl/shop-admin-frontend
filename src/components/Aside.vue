<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu v-for="(item,index) in memus" :key="index" :index="`${index}+1`">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <el-menu-item-group v-for="(item1,index1) in item.groups" :key="index1">
        <el-menu-item index="`${index+1}-${index1+1}`">
          <router-link :to="item1.link">{{item1.name}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  padding-top: 60px;
  box-sizing: border-box;
  width: 199px;
}
.el-menu-vertical-demo {
  height: 100%;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>

<script>

export default {

  props:["isCollapse"],
  data() {
    return {
      memus: [
        {
          icon: "el-icon-menu",
          title: "购物商场",
          groups: [{ link: "/admin/goods-list", name: "商品管理" }, { link: "/admin/category-list", name: "栏目管理" }]
        },
        {
          icon: "el-icon-star-on",
          title: "会员管理",
          groups: [{ link: "#", name: "会员列表" }]
        },
        {
          icon: "el-icon-tickets",
          title: "商场订单",
          groups: [{ link: "#", name: "订单管理" }]
        }
      ]
    };
  },

};
</script>
