import {get} from '../http'
import moment from 'moment';
export default {
  namespaced:true,
  state:{
    orders:[],
    message:''
  },
  getters:{
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations:{
    resetOrders(state,orders){
      state.orders = orders;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    // 取消派单
    cancelSendOrder({commit,dispatch},orderId){
      return get("/order/cancelSendOrder",{orderId})
      .then((result)=>{
        commit("resetMessage",result.statusText)
        dispatch("findAllOrders");
      })
    },
    // 派单
    sendOrder({commit,dispatch},params){
      return get("/order/sendOrder",params)
      .then((result)=>{
        commit("resetMessage",result.statusText)
        dispatch("findAllOrders");

      })
    },
    // 查询所有订单
    findAllOrders({commit}){
      get("/order/findAll")
      .then((result)=>{
        // 对日期进行重置
        result.data.forEach((item)=>{
          item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
        })
        commit("resetOrders",result.data);
      })
    }
  }
}