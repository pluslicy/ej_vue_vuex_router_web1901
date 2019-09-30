import {get} from '../http'
export default {
  namespaced:true,
  state:{
    waiters:[]
  },
  getters:{
    
  },
  mutations:{
    resetWaiters(state,waiters){
      state.waiters = waiters;
    }
  },
  actions:{
    findAllWaiters({commit}){
      get("/waiter/findAll")
      .then((result)=>{
        commit("resetWaiters",result.data);
      })
    }
  }
}