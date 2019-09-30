<template>
  <div id="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="all">
        <el-table :data="orders" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="待支付">
        <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="待派单">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="操作" width="80px">
            <template v-slot="slot">
              <a href="" @click.prevent="paidanHandler(slot.row.id)">派单</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="待接单">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
          <el-table-column label="操作" width="80px">
            <template v-slot="slot">
              <a href="">取消</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="待服务">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="待评价">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="已完成">
         <el-table :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客id" prop="customerId"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose">
      
     <div class="dialog-content">
        <el-radio-group v-model="waiterId">
          <div v-for="w in waiters" :key="w.id" >
            <el-radio style="line-height:3em" :label="w.id" >{{w.realname}}</el-radio>
          </div>
        </el-radio-group>
     </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
      title:"派单",
      visible:false,
      activeName:"all",
      waiterId:0,
    }
  },
  created(){
    this.findAllOrders();
  },
  computed:{
    ...mapState("order",["orders"]),
    ...mapState("waiter",["waiters"]),
    ...mapGetters("order",["filterOrdersByStatus"])
  },
  methods:{
    ...mapActions("order",["findAllOrders"]),
    handleClick(tab){
      this.activeName = tab.name;
    },
    handleClose(){
      this.visible = false;
    },
    paidanHandler(orderId){
      this.visible = true;
    }
  }
}
</script>
<style scoped>
.dialog-content {
  height: 300px;
  padding: 0 1em;
  overflow: scroll;
}
</style>