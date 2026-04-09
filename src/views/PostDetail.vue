<script setup>
import {computed, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import api from "@/api/index.js";

const props = defineProps(['id'])
const router = useRouter()

const post = ref(null)

const load = async (id) => {
  try {
    const res = await api.detail(id)
    post.value = res
  } catch (error) {
    alert("존재하지 않는 게시물입니다.")
    await router.push({name: 'PostList'})
  }
}

onMounted(() => {
  load(props.id)
})

</script>

<template>
  <div class="container" v-if="post">
    <div class="post-header">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <span>ID: {{ post.idx }}</span>
      </div>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>
    <div class="actions">
      <button @click="router.push({ name: 'PostList' })" class="btn">목록으로</button>
    </div>
  </div>
  <div v-else class="container">
    <p>게시글을 찾을 수 없습니다.</p>
    <button @click="router.push({ name: 'PostList' })" class="btn">목록으로</button>
  </div>
</template>

<style scoped>
.container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
.post-header { border-bottom: 2px solid #333; padding-bottom: 1rem; margin-bottom: 2rem; }
.post-meta { color: #888; font-size: 0.9rem; margin-top: 0.5rem; }
.post-content { line-height: 1.6; font-size: 1.1rem; white-space: pre-wrap; min-height: 200px; }
.actions { margin-top: 3rem; border-top: 1px solid #eee; padding-top: 1rem; }
.btn { padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; border: 1px solid #ddd; background: #fff; font-weight: bold; }
</style>
