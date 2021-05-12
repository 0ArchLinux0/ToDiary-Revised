import { createWebHistory, createRouter } from 'vue-router'
import ContainerMain from '../components/ContainerMain.vue'
import Memo from '../components/Memo.vue'
import TodoList from '../components/TodoList.vue'
import Home from '../components/Home.vue'

const routes = [
  { 
    path: '/', 
    component: ContainerMain,
    children: [
      {
        name: 'Home',
        path: '/',
        component: Home
      },
      { 
        name: 'Memo',
        path: '/memo', 
        component: Memo,
      },
      { 
        name: 'TodoList',
        path: '/todo', 
        component: TodoList,
      },
      // {
      //   name: 'ReactionTime',
      //   path: '/reaction-time',
      //   component: ReactionTime
      // },
      // {
      //   name: 'NumberMemory',
      //   path: '/memory/number',
      //   component: NumberMemory
      // },
      // {
      //   name: 'MentalArithmetic',
      //   path: '/mental-arithmetic',
      //   component: MentalArithmetic
      // },
    ]
  },
  // {
  //   name: 'Home',
  //   path: '/',
  //   component: Home
  // },
  // { 
  //   name: 'Memo',
  //   path: '/memo', 
  //   component: Memo,
  // },
  // { 
  //   name: 'TodoList',
  //   path: '/todo', 
  //   component: TodoList,
  // },
  // { 
  //   name: 'Register',
  //   path: '/register', 
  //   component: Registration,
  // },
]
// export default router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})