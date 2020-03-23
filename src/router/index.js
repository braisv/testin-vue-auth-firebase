import Vue from 'vue'
import VueRouter from 'vue-router'
const firebase = require("firebase/app");

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "Add" */ '../views/Add.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  const protectedView = to.matched.some( record => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;
  return protectedView && !user ? next('/login') : next()
})

export default router
