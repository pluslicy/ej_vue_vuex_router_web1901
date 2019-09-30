import {get} from '../http'
import moment from 'moment';
export default {
  namespaced:true,
  state:{
    orders:[]
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
    }
  },
  actions:{
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