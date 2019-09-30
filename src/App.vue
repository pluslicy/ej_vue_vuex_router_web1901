<template>
  <div id="app">
    <el-container class="container">
      <el-header height="56px" class="header">
        <div class="title">
          {{title}}
        </div>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px" class="left-aside">
          <el-menu
            :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
            @select="selectHandler">
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">dashboard</span>
            </el-menu-item>
            <el-menu-item index="/customer">
              <i class="el-icon-user-solid"></i>
              <span slot="title">顾客管理</span>
            </el-menu-item>
            <el-menu-item index="/category">
              <i class="el-icon-menu"></i>
              <span slot="title">栏目设置</span>
            </el-menu-item>
            <el-menu-item index="/product">
              <i class="el-icon-s-finance"></i>
              <span slot="title">产品管理</span>
            </el-menu-item>
            <el-menu-item index="/order">
              <i class="el-icon-message-solid"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- / 左侧导航 -->
        <!-- 右侧内容 -->
        <el-main>
          <!-- <Product/> -->
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
              <el-breadcrumb-item>{{current.viewName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 动态组件 -->
          <!-- <component v-bind:is="current.view"></component> -->
          <!-- 路由组件显示区域 -->
          <router-view />
        </el-main>
        <!-- 右侧内容 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: 'app',
  data(){
    return {
      title:"E洁家政服务平台",
      currentViewName:"顾客管理"
    }
  },
  created(){
    // 查询所有入驻员工信息
    this.findAllWaiters();
  },
  computed:{
    ...mapState("app",["current"])
  },
  methods:{
    ...mapMutations("app",["resetCurrentView"]),
    ...mapActions("waiter",["findAllWaiters"]),
    selectHandler(index){
      switch(index){
        case "/":
          break;
        case "/customer":
          this.resetCurrentView("Customer")
          break;
        case "/category":
          this.resetCurrentView("Category")
          break;
        case "/product":
          this.resetCurrentView("Product")       
          break;
        case "/order":
          this.resetCurrentView("Order")       
          break;
        case "5":
          break;
        default:
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.container {
  position: absolute;
  width:100%;
  top:0;bottom: 0;
}
.container > .header {
  background: teal;
  color: #ffffff;
  line-height: 56px;
}
.header > .title {
  font-size: 18px;
  font-weight: bold;
}
.container .left-aside {
  border-right: 1px solid #e6e6e6;
}
.breadcrumb {
  margin-bottom: 1em;
}
</style>
