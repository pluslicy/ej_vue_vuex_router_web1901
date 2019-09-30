export default {
  namespaced:true,
  state:{
    name:"app",
    current:{
      view:"Customer",
      viewName:"顾客管理"
    }
  },
  getters:{

  },
  mutations:{
    resetCurrentView(state,view){
      state.current.view = view;
      switch(view){
        case "Customer":
          state.current.viewName = "顾客管理";
          break;
        case "Category":
          state.current.viewName = "栏目管理";
          break;
        case "Product":
          state.current.viewName = "产品管理";
          break;
        case "Order":
          state.current.viewName = "订单管理";
          break;
        default:
          break;
      }
    }
  },
  actions:{
    
  }
}