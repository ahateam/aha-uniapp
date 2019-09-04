import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'

const dashboard  = ()=>import('./views/aha/dashboard')

/**组件 */
const tableShow = ()=>import('./views/component/table/tableShow')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'login',
          component: login,
      },
      {
          path:'/home',
          name:'home',
          component:home,
          children:[
              {
                  path: '/dashboard',
                  name: 'dashboard',
                  component: dashboard
              },

              /**组件 */
              {
                path: '/tableShow',
                name: 'tableShow',
                component: tableShow 
              }

          ]
      },
      {
          path:'/login',
          name:'login',
          component:login
      }


  ]
})
