<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from "@/api/index.js";

const router = useRouter()
const title = ref('')
const content = ref('')

const handleSubmit = async () => {
  try {
    await api.register({
      title: title.value,
      content: content.value
    })
    alert('게시글이 등록되었습니다.');
    await router.push('/board/list');
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="container">
    <h1>게시글 작성</h1>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="field">
        <label for="title">제목</label>
        <input id="title" v-model="title" type="text" placeholder="제목을 입력하세요" required />
      </div>
      <div class="field">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" rows="10" placeholder="내용을 입력하세요" required></textarea>
      </div>
      <div class="actions">
        <button type="button" @click="router.back()" class="btn">취소</button>
        <button type="submit" class="btn primary">저장</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
.form { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.5rem; }
label { font-weight: bold; }
input, textarea { 
  padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;
  font-family: inherit;
}
input:focus, textarea:focus { outline: 1px solid #42b883; border-color: #42b883; }
.actions { display: flex; justify-content: flex-end; gap: 1rem; }
.btn { padding: 0.6rem 1.5rem; border-radius: 4px; cursor: pointer; border: 1px solid #ddd; background: #fff; font-weight: bold; }
.btn.primary { background-color: #42b883; color: white; border: none; }
</style>
