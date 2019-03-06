<template>
  <el-form
    :model="ruleForm2"
    status-icon
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号 " >
      <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" >
      <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="login_btn">
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
     
    },
    resetForm() {
       this.ruleForm2= {
        username: "",
        password: "",
      }
    }
  }
};
</script>
<style>
.demo-ruleForm {
    width: 400px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login_btn {
    text-align: center;
}
</style>
