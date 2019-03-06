<template>
  <div class="admin_container">
    <el-container>
      <el-aside width="auto">
        <app-aside :isCollapse="isCollapse"></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header @changeCollapse="collapseToggle"></app-header>
        </el-header>
        <el-main>
            <app-breadcrumb></app-breadcrumb>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import Breadcuumb from "../components/Breadcrumb";
export default {

  data:function(){
      return{
          isCollapse:false,
      }
  },
  name: "admin-index",
  components: {
    "app-aside": Aside,
    "app-header": Header,
    "app-breadcrumb":Breadcuumb,
  },
  methods:{
      collapseToggle(){
          this.isCollapse = !this.isCollapse;
            
      }
  }
};
</script>

<style>
.admin_container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
}

.el-header {
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body .el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
