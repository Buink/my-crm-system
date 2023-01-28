import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty', title: 'Login'},
    component: () => import('@/views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty', title: 'Register'},
    component: () => import('@/views/RegisterView')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', title: 'Home'},
    component: () => import('@/views/HomeView')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', title: 'Details'},
    component: () => import('@/views/DetailView')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', title: 'History'},
    component: () => import('@/views/HistoryView')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', title: 'Planning'},
    component: () => import('@/views/PlanningView')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', title: 'Record'},
    component: () => import('@/views/RecordView')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', title: 'Categories'},
    component: () => import('@/views/CategoriesView')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', title: 'Profile'},
    component: () => import('@/views/ProfileView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
