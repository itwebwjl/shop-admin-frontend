<template>
  <div class="mb20">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: item.src }" 
      v-for="(item,index) in routeInfo" :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed:{
        routeInfo:function(){
            let newArr = this.$route.matched.map((v) => {
                return {
                    src:v.path,
                    title:v.meta
                }
            });
            return newArr;
        }
    }
};
</script>

<style>
</style>
