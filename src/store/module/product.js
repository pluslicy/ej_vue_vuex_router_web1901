import {post} from '../http';

export default {
  namespaced:true,
  state:{
    name:"product",
    list:[],
    visible:false,
    title:"添加产品",
    message:""
  },
  getters:{

  },
  mutations:{
    resetList(state,list){
      state.list = list;
    },
    resetVisible(state,visible){
      state.visible = visible;
    },
    resetTitle(state,title){
      state.title = title;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    openModal({commit}){
      commit("resetVisible",true);
    },
    closeModal({commit}){
      commit("resetVisible",false);
    },
    // 分页查询
    query({commit},params){
      post("/product/query",params)
      .then((result)=>{
        commit("resetList",result.data);
      })
    },
    // 保存或更新
    saveOrUpdate({commit,dispatch},product){
      return post("/product/saveOrUpdate",product)
      .then((result)=>{
        // 记录反馈信息
        commit("resetMessage",result.statusText);
        // 关闭模态框
        dispatch("closeModal")
      })
    }
  }
}