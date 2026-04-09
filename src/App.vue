<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link :to="{name: 'PostList'}" class="nav-logo">Simple Board</router-link>
      <div class="nav-links">
        <router-link :to="{name: 'PostList'}">목록</router-link>
        <router-link :to="{name: 'PostCreate'}">글쓰기</router-link>
      </div>
    </div>
  </nav>

  <main>
    <router-view />
  </main>
</template>

<style>
/* Global Styles */
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #2c3e50; background-color: #fcfcfc; }
.navbar { background-color: #fff; border-bottom: 1px solid #eaeaea; padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
.nav-content { max-width: 800px; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; align-items: center; }
.nav-logo { font-size: 1.5rem; font-weight: bold; color: #42b883; text-decoration: none; }
.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { text-decoration: none; color: #666; font-weight: 500; }
.nav-links a:hover, .nav-links a.router-link-active { color: #42b883; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
