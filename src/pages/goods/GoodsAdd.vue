<template>
  <el-form ref="form" :model="form" label-width="80px">
    <!-- 所属类别方法 1  -->
    <el-form-item label="所属类别">
      <el-select placeholder="请选择" v-model="form.category_id">
        <el-option-group
          v-for="(item,index) in category"
          v-if="item.class_layer === 1"
          :key="index"
          :label="item.title"
        >
          <el-option
            v-for="(sonitem,sonindex) in category"
            v-if="sonitem.parent_id === item.category_id"
            :key="sonindex"
            :label="sonitem.title"
            :value="sonitem.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
      <span class="tips">*不发布前台则无法显示</span>
    </el-form-item>
    <el-form-item label="轮播文字">
      <el-switch v-model="form.is_slide"></el-switch>
      <span class="tips">*是否在轮播图播放文字</span>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>
    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-row>
        <el-col :span="8">
          <el-input v-model="form.goods_no"></el-input>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="库存数量">
      <el-row>
        <el-col :span="8">
          <el-input v-model="form.stock_quantity"></el-input>
        </el-col>
        <el-col :span="12">*我不确定要不要自动生成</el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="市场价格">
      <el-row>
        <el-col :span="8">
          <el-input v-model="form.market_price"></el-input>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-row>
        <el-col :span="8">
          <el-input v-model="form.sell_price"></el-input>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-success="handleFileList"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>
    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>
    <el-form-item label="内容描述" class="miaoshu">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      // 头像图片
      imageUrl: "",
      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false,

      category: [],

      form: {
        title: "",
        sub_title: "",
        goods_no: "",
        category_id: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        zhaiyao: "",
        content: "",
        imgList: [],
        fileList: []
      }
    };
  },
  components: {
    quillEditor
  },
  mounted: function() {
    this.$axios({
      method: "get",
      url: "/admin/category/getlist/goods"
    }).then((res) => {
      const { message } = res.data;
      this.category = message;
    });
  },
  methods: {
    onSubmit() {
        this.$axios({
            method:"post",
            url:"/admin/goods/add/goods",
            data:this.form,
            // 处理跨域
            withCredentials: true,
        }).then((res) => {
            const {message,status} = res.data;
            if(status ===0) {
              this.$message({
                message:message,
                type:"success"
              });
              setTimeout(() => { this.$router.push("/admin/goods-list")},500); 
            }else {
              this.$message({
                message:message,
                type:"error"
              });
            }
        })
    },
    // 上传封面图片成功的回调函数
    handleAvatarSuccess(res, file) {
      // 头像预览，把图片解析成base64字符串
      this.imageUrl = window.URL.createObjectURL(file.raw);

      this.form.imgList = [res];
    },

    // 上传图片相册的成功回调函数
    handleFileList(res) {
      this.form.fileList.push(res);
    },

    // 判断图片是否大于2m， 如果是的话不上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 移除选中的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>