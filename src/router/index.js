import { createWebHistory, createRouter } from 'vue-router'
import ContainerMain from '../components/ContainerMain.vue'
import Memo from '../components/Memo.vue'
import TodoList from '../components/TodoList.vue'
import Policy from '../components/Policy.vue'
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
      // { 
      //   name: 'todo',
      //   path: 'todo', 
      //   component: TodoList,
      // },
      { 
        name: 'todo',
        path: 'todo/:date', 
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
      },
      {
        name: 'Policy',
        path: 'policy',
        component: Policy
      },
      
    ]
  },
  
  // },
]
// export default router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})