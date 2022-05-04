
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'

const routes = [
    {
        name: 'Home', 
        path: '/',
        component: Home,
    }, {
        name: 'Login',
        path: '/login',
        component: Login,
    }, 

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;