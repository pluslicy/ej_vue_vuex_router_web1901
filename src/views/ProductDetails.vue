<template>
  <div id="productDetails">
    产品详情
    <el-button type="text" @click="()=>{this.$router.back()}">返回</el-button>
    {{product}}
  </div>
</template>
<script>
import {get} from "../store/http"
export default {
  data(){
    return {
      product:{}
    }
  },
  created(){
    let id = this.$route.params.id;
    // 通过id查询产品的详细信息
  }
}
</script>
<style scoped>

</style>