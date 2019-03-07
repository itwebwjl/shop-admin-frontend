<template>
  <el-form :model="ruleForm2" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号 ">
      <el-input v-model="ruleForm2.uname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="ruleForm2.upwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="login_btn">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm2: {
        uname: "",
        upwd: ""
      }
    };
  },

  methods: {
    submitForm() {
      this.$axios({
        method: "post",
        url: "/admin/account/login",
        data: this.ruleForm2,
        // 处理跨域
        withCredentials: true,
      })
        .then(res => {
          const {message,status} =res.data;
          if(status === 0) {
            this.$message(message.realname);
            setTimeout(() => {
              this.$router.back();
            },1000)
          }
        })
        .catch(err => {
        });
    },
    resetForm() {
      this.ruleForm2 = {
        username: "",
        password: ""
      };
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
  transform: translate(-50%, -50%);
}
.login_btn {
  text-align: center;
}
</style>
