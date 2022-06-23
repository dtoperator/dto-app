import VueRouter from 'vue-router';

import Front from "./pages/Front";
import Home from "./pages/Home";
import Numbers from "./pages/Numbers";
import FAQ from "./pages/FAQ";
import Broadcast from "./pages/Broadcast";

const routes = [{
    path: '/',
    name: 'front',
    component: Front,
    children: [{
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/numbers',
        name: 'numbers',
        component: Numbers,
    }, {
        path: '/faq',
        name: 'faq',
        component: FAQ,
    }, {
        path: '/broadcast',
        name: 'broadcast',
        component: Broadcast,
        props: true,
    }]
}];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

export default router
