<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  mounted: function() {
    this.$axios({
      method: "get",
      url: "/admin/account/islogin"
    })
      .then(res => {
        console.log(res);
        const { code } = res.data;
        if (code == "nologin") {
          this.$message("你还没有登录，请先登录");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>

