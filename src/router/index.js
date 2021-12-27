import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue';
import store from '../store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/checkins',
    name: 'Checkins',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkins.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && store.state.token === undefined) {
    next({name: 'Login'});
  } else if(to.name === 'Login' && store.state.token !== undefined)
    next({name: 'Tasks'});
  else
    next()
})

export default router
