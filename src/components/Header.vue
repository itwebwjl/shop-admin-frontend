<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="1">
      <div class="grid-content bg-purple"  @click="changeCollapse">
          <i class="el-icon-arrow-left"></i>
      </div>
    </el-col>
    <el-col :span="1">
      <div class="grid-content bg-purple">admin</div>
    </el-col>
  </el-row>
</template>

<script>
export default {

  methods:{
    changeCollapse(){
      this.$emit("changeCollapse");
    }
  }
};
</script>

<style scoped>
.row-bg {
    background: #fff;
}
.el-icon-arrow-left {
  cursor: pointer;
}
</style>

