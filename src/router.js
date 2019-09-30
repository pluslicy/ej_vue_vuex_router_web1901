import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Customer from './views/Customer'
import Category from './views/Category'
import Product from './views/Product'
import ProductDetails from './views/ProductDetails'
import Order from './views/Order'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home }, 
    { path: '/customer', name: 'customer', component: Customer },
    { path: '/category', name: 'category', component: Category },
    { path: '/product', name: 'product', component: Product },
    { path: '/productDetails/:id', name: 'productDetails', component: ProductDetails },
    { path: '/order', name: 'order', component: Order },

  ]
})
