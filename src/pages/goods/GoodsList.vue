<template>
  <div>
    <!-- 输入框和两个按钮 -->
    <div class="pt20 mb20 mtb">
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button round @click="toAddPage">添加</el-button>
            <el-button round @click="delGoodsById(ids)">删除</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="searchvalue">
              <el-button slot="append" icon="el-icon-search" @click="getListBySeach"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <el-row type="flex">
            <img :src="scope.row.imgurl" alt class="goods_img">
            {{scope.row.title}}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">{{scope.row.categoryname}}</template>
      </el-table-column>
      <el-table-column label="价格" width="180">
        <template slot-scope="scope">{{ scope.row.market_price }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" @click="delGoodsById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 6, 7, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      searchvalue: "",
      totalcount: 0,
      ids: ""
    };
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`
        )
        .then(res => {
          if (res.data.status == 0) {
            this.tableData = res.data.message;
            this.totalcount = res.data.totalcount;
          }
        });
    },
    toAddPage() {
      this.$router.push("/admin/goods-add");
    },
    getListBySeach() {
      this.getGoodsList();
    },
    handleSizeChange(num) {
      this.pageSize = num;
      this.getGoodsList();
    },
    handleCurrentChange(num) {
      this.pageIndex = num;
      this.getGoodsList();
    },
    // 点击复选框获取对应一行的数据
    handleSelectionChange(arr) {
      let newArr = arr.map(v => {
        return v.id;
      });
      let idstr = newArr.join(",");
      this.ids = idstr;
    },
    delGoodsById(ids) {
      this.$axios
        .get(`http://localhost:8899/admin/goods/del/${ids}`)
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
              this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getGoodsList();
          }
        });
    }
  }
};
</script>

<style scoped>
.mtb {
  border-top: solid 1px #ccc;
}
.pt20 {
  padding-top: 20px;
}
.goods_img {
  display: block;
  height: 65px;
  width: 65px;
  margin-right: 10px;
}
</style>
