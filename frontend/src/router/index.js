
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import List from "@/views/ListPostsView.vue";

const routes = [
    {
        name: 'Home', 
        path: '/',
        component: Home,
    }, 
    {
        name: 'Login',
        path: '/login',
        component: Login,
    }, 
    {
        name: 'List',
        path: '/list',
        component: List,
    }, 
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;