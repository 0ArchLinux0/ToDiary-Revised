import { createWebHistory, createRouter } from 'vue-router'
import ContainerMain from '../components/ContainerMain.vue'
import Memo from '../components/Memo.vue'
import TodoList from '../components/TodoList.vue'
import MyPage from '../components/MyPage.vue'
import Register from '../components/Register.vue'
import Contact from '../components/Contact.vue'
import Login from '../components/Login.vue'
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
        path: 'memo', 
        component: Memo,
      },
      { 
        name: 'TodoList',
        path: 'todo', 
        component: TodoList,
      },
      {
        name: 'Contact',
        path: 'contact',
        component: Contact
      },
      {
        name: 'MyPage',
        path: 'mypage',
        component: MyPage
      },
      {
        name: 'Login',
        path: 'login',
        component: Login
      },
      {
        name: 'Register',
        path: 'register',
        component: Register
      }
    ]
  },
  
  // },
]
// export default router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})