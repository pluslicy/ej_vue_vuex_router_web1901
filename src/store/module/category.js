import { get } from "../http"
export default {
  namespaced:true,
  state:{
    name:"category",
    list:[]
  },
  getters:{

  },
  mutations:{
    resetList(state,list){
      state.list = list;
    }
  },
  actions:{
    findAll({commit}){
      get("/category/findAll")
      .then((result)=>{
        commit("resetList",result.data)
      })
    }
  }
}