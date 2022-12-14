import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/Login/Login-index.vue'),

    },
    {
        path: '/articlebug/:articleid',
        name: 'articlebug',
        component: () =>
            import ('@/views/articlebug/articleindex.vue'),
        props: true

    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/',
        redirect: '/home',
        component: () =>
            import ('@/views/Layout'),

        children: [{
                path: '/home', // 默认子路由，只能有1个
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa')
            },
            {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video')
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my')
            }
        ],

    },

]

const router = new VueRouter({
    routes
})

export default router