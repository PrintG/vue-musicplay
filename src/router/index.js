import Vue from 'vue'
import Router from 'vue-router'
import MusicPlay from '@/components/MusicPlay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MusicPlay
    }
  ]
})
