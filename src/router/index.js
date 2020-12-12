import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import { projectAuth } from '../firebase/config'
import Chatroom from '../views/Chatroom.vue'

//Auth guard
const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    console.log('currentUser in auth guard: ', user)
    if (!user) {
        next({ name: 'Welcome' })
    }
    next()
}

//No auth
const requireNoAuth = (to, from, next) => {
    let user = projectAuth.currentUser

    if (user) {
        console.log('User tryed to get a No auth route: ', user)
        next({ name: 'Chatroom' })
    }
    next()
}


const routes = [{
        path: '/',
        name: 'Welcome',
        component: Welcome,
        beforeEnter: requireNoAuth
    },
    {
        path: '/chatroom',
        name: 'Chatroom',
        component: Chatroom,
        beforeEnter: requireAuth
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router