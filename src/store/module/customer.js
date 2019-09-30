import {post,get,post_array} from '../http'

export default {
  namespaced:true,
  state:{
    name:"customer",
    list:[],
    message:"",
    visible:false,
    loading:false
  },
  getters:{

  },
  mutations:{
    // 重置list
    resetList(state,list){
      state.list = list;
    },
    // 重置msg
    resetMsg(state,msg){
      state.message = msg;
    },
    // 重置visible
    resetVisible(state,visible){
      state.visible = visible
    },
    // 重置loading
    resetLoaing(state,loading){
      state.loading = loading;
    }
  },
  actions:{
    openModal(context){
      context.commit("resetVisible",true)
    },
    closeModal(context){
      context.commit("resetVisible",false)
    },
    saveOrUpdate(context,customer){
      return post("/customer/saveOrUpdate",customer)
      .then((result)=>{
        context.commit("resetMsg",result.statusText)
        context.dispatch("findAll");
        context.dispatch("closeModal");
      })
    } ,
    batchDelete({commit},ids){
      return post_array("/customer/batchDelete",{ids})
      .then((result)=>{
        commit("resetMsg",result.statusText)
      })
    },
    deleteById({commit},id){
      get("/customer/deleteById?id="+id)
      .then((result)=>{
        commit("resetMsg",result.statusText);
      })
    },
    findAll(context){
      context.commit("resetLoaing",true)
      get("/customer/findAll")
      .then((result)=>{
        // 将查询到的数据通过mutations设置到state中
        context.commit("resetList",result.data);
      })
      .finally(()=>{
        context.commit("resetLoaing",false)
      });
    },
    // 分页查询
    query({commit},params){
      post("/customer/query",params)
      .then((result)=>{
        commit("resetList",result.data);
      })
    },
  }
}