import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/views/PostList.vue'
import PostCreate from '@/views/PostCreate.vue'
import PostDetail from '@/views/PostDetail.vue'

const routes = [
  { path: '/board/list', name: 'PostList', component: PostList },
  { path: '/board/register', name: 'PostCreate', component: PostCreate },
  { path: '/board/:id', name: 'PostDetail', component: PostDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
