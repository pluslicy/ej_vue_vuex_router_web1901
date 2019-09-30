<template>
  <div id="product">
    <el-row>
      <!-- 搜索栏 -->
      <el-col :span="12">
        <el-form :inline="true">
          <el-form-item label="名称">
            <el-input size="small" v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="12" style="text-align:right;line-height:40px;height:40px;">
        <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="productList.list" size="small">
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="所属分类" prop="category.name"></el-table-column>
      <!-- <el-table-column label="图片">
        <template v-slot="slot">
          <img width="100%" :src="slot.row.photo" alt="图片找不到">
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="150px" align="center">
        <template v-slot="slot">
          <a href="">删除</a> &nbsp;
          <a href="">修改</a> &nbsp;
          <a href="" @click.prevent="toDetailsHandler(slot.row.id)">详情</a> &nbsp;
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handlePageChange"
      :page-size="params.pageSize"
      :current-page="params.page+1"
      :total="productList.total">
    </el-pagination>
    <!-- 模态框 -->
     <el-dialog :title="title" :visible="visible" @close="closeModal">
      <el-form :model="product" ref="productForm" :rules="rules" label-width="80px" labelPosition="left">
        <el-form-item label="名称" prop="name">
          <el-input v-model="product.name"/>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="product.price"/>
        </el-form-item>
        <el-form-item label="所属栏目" prop="categoryId">
          <el-select v-model="product.categoryId" placeholder="请选择">
            <el-option v-for="c in categoryList" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="product.description"/>
        </el-form-item>
        <el-form-item label="产品主图" prop="photo">
          <!-- 上传插件 -->
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:8099/manager/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- / 上传插件 -->
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="closeModal">取消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit('productForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapActions, mapMutations} from 'vuex'
export default {
  data(){
    return {
      name:"产品管理",
      params:{
        page:0,
        pageSize:5
      },
      rules:{},
      product:{},
      fileList:[]
    }
  },
  created(){
    this.queryProduct(this.params);
  },
  computed:{
    ...mapState("product",["visible","title","message"]),
    ...mapState("product",{
      productList:"list"
    }),
    ...mapState("category",{
      categoryList:"list"
    })
  },
  methods:{
    ...mapActions("product",["openModal","closeModal"]),
    ...mapActions("product",{
      queryProduct:"query",
      saveOrUpdateProduct:"saveOrUpdate"
    }),
    ...mapActions("category",{
      findAllCategory:"findAll",
    }),
    ...mapMutations("app",["resetCurrentView"]),
    // 跳转到产品详情中
    toDetailsHandler(id){
      this.$router.push("/productDetails/"+id)
    },
    // 上传成功的处理函数
    uploadSuccessHandler(response,file,fileList){
      let id = response.data.id;
      this.product.photo = "http://134.175.154.93:8888/group1/"+id;
      this.fileList = fileList;
    },
    handleQuery(){
      this.queryProduct(this.params)
    },
    handlePageChange(page){
      this.params.page = page-1;
      this.queryProduct(this.params)
    },
    handleSubmit(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.saveOrUpdateProduct(this.product).then(()=>{
            this.queryProduct(this.params);
            this.$notify({
              type:"success",
              title:"成功",
              message:this.message
            })
          })
        } else {
          return false;
        }
      })
    },
    toAddHandler(){
      this.findAllCategory();
      this.openModal();
    }
  }
}
</script>
<style scoped>

</style>