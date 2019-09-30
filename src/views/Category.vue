<template>
  <div id="category">
    <div class="btns">
      <el-button size="small" type="primary" @click="handleToAdd">添加</el-button>
      <el-button size="small" type="danger" @click="handleToBatchDel">批量删除</el-button>
    </div>
    <!-- / 按钮 -->
    <!-- 表格 -->
    <el-table size="small" :data="categories" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="栏目名称" width="150"/>
      <el-table-column prop="icon" label="图标"/>
      <el-table-column label="操作" width="100" align="center">
        <template v-slot="slot">
          <a href="" @click.prevent="handleToDel(slot.row.id)">删除</a>
          <a href="" @click.prevent="handleToEdit(slot.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
export default {
  data(){
    return {
      name:"栏目管理"
    }
  },
  created(){
    this.findAllCategory()
  },
  computed:{
    ...mapState("category",{
      categories:"list"
    })
  },
  methods:{
    ...mapActions("category",{
      findAllCategory:"findAll"
    }),
    // 去添加
    handleToAdd(){

    },
    // 去批量删除
    handleToBatchDel(){
      
    }
  }
}
</script>
<style scoped>

</style>