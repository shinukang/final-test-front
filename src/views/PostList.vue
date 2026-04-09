<script setup>
import api from '@/api'
import {onMounted, ref} from "vue";

const boards = ref([])

const loadList = async () => {
  try {
    const res = await api.list()
    boards.value = res;
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadList();
})

</script>

<template>
  <div class="container">
    <div class="header">
      <h1>게시글 목록 V2</h1>
      <router-link :to="{name: 'PostCreate'}" class="btn primary">글쓰기</router-link>
    </div>
    <div class="post-list">
      <div v-for="post in boards" :key="post.idx" class="post-item">
        <router-link :to="{ name: 'PostDetail', params: { id: post.idx } }" class="post-title">
          {{ post.title }}
        </router-link>
      </div>
      <div v-if="boards.length === 0" class="empty">게시글이 없습니다.</div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.post-list { border-top: 2px solid #333; }
.post-item { 
  display: flex; justify-content: space-between; padding: 1rem 0.5rem; border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}
.post-item:hover { background-color: #f9f9f9; }
.post-title { font-size: 1.1rem; color: #333; text-decoration: none; font-weight: 500; }
.post-title:hover { color: #42b883; }
.post-date { color: #888; font-size: 0.9rem; }
.btn { padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; cursor: pointer; border: none; font-weight: bold; }
.btn.primary { background-color: #42b883; color: white; }
.empty { padding: 2rem; text-align: center; color: #888; }
</style>
