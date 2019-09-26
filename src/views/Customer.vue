<template>
  <div id="customer">
    <!-- 按钮 -->
    <div class="btns">
      <el-button size="small" type="primary" @click="handleToAdd">添加</el-button>
      <el-button size="small" type="danger" @click="handleToBatchDel">批量删除</el-button>
    </div>
    <!-- / 按钮 -->
    <!-- 表格 -->
    {{ids}}
    <el-table :data="list" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="realname" label="姓名"/>
      <el-table-column prop="telephone" label="手机号"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column label="操作" >
        <template v-slot="slot">
          <a href="" @click.prevent="handleToDel(slot.row.id)">删除</a>
          <a href="" @click.prevent="handleToEdit(slot.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- / 表格 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible="visible" @close="handleClose">
      <el-form :model="customer" ref="customerForm" :rules="rules" label-width="80px" labelPosition="left">
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="customer.realname"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="customer.password"/>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="customer.telephone"/>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit('customerForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- / 模态框 -->
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      title :"添加顾客信息",
      customer:{},
      ids:[],
      rules:{
        realname:[
          {required:true,message:"请输入姓名",trigger:"blur"},
          {min:2,max:6,message:"姓名的字数应该是2~6位",trigger:"blue"}
        ],
        password:[
          {required:true,message:"请输入密码",trigger:"blur"},
          {min:6,message:"密码不少于6位",trigger:"blue"}
        ],
        telephone:[
          {required:true,message:"请输入手机号",trigger:"blur"}
        ]
      }
    }
  },
  created(){
    this.findAllCustomer();
  },
  computed:{
    ...mapState("customer",["list","visible","loading","message"])
  },
  methods:{
    ...mapActions("customer",["openModal","closeModal"]),
    ...mapActions("customer",{
      findAllCustomer:"findAll",
      saveOrUpdateCustomer:"saveOrUpdate",
      deleteCustomerById:"deleteById",
      batchDeleteCustomer:"batchDelete"
    }),
    handleSelectionChange(val){
      this.ids = val.map(item=>item.id);
    },
    handleToBatchDel(){
      this.batchDeleteCustomer(this.ids)
    },
    handleToDel(id){
      this.deleteCustomerById(id)
      .then(()=>{
        this.$notify({ title:"成功", type:"success", message:this.message })
      });
    },
    handleToAdd(){
      this.title = "添加顾客信息";
      this.customer = {};
      this.openModal();
    },
    handleToEdit(row){
      this.title="修改顾客信息";
      this.$refs.customerForm.resetFields();
      this.customer = row;
      this.openModal();
    },
    handleClose(){
      this.closeModal();
    },
    handleSubmit(formName){
      // 在提交之前先去执行校验操作
      this.$refs[formName].validate((valid)=>{
        if(true){
          // 如果校验通过
          this.saveOrUpdateCustomer(this.customer)
          .then((result)=>{
            this.$notify({
              title:"成功", type:"success", message:this.message
            })
          })
        } else {
          return false;
        }
      });
      
    }
  }
}
</script>
<style scoped>

</style>