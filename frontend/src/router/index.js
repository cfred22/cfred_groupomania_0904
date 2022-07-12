
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeIntroView.vue'
import Login from '@/views/SignupLoginView.vue'
import List from "@/views/ListPostsView.vue";
import Profile from "@/views/ProfileView.vue";
import UserInfos from "@/views/UserInfosView.vue";

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
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
    }, 
    {
        name: 'UserInfos',
        path: '/userInfos/:id',
        component: UserInfos
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;