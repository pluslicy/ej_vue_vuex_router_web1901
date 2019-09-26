import Vue from 'vue'
import Vuex from 'vuex'
import customer from './module/customer'
import category from './module/category'
import product from './module/product'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    customer,
    product,
    category,
    app
  }
})
