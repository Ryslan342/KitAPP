import Vue from 'vue'
import Router from 'vue-router'
import { IonicVueRouter } from '@ionic/vue';

// components
import hotels from './hotel/Hotels.vue'
import hotelRouter from './hotel/router.js'
import login from './views/Login.vue'
import NotFound from './components/NotFound'

Vue.use(IonicVueRouter);
Vue.use(Router);

const router = new  IonicVueRouter({
    mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
    base: "/",
    routes: [
        {
            path: '/',
            name: 'hotels-list',
            component: hotels
        },
        hotelRouter,
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});

export default router;