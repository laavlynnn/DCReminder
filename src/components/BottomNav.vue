<script setup>
defineProps({
  icons: Object
})

const tabs = [
  { label: 'Home', to: '/', key: 'home' },
  { label: 'Today', to: '/list/Today', key: 'today' },
  { label: 'Schedule', to: '/list/Scheduled', key: 'schedule' },
  { label: 'Done', to: '/list/Completed', key: 'done' },
  { label: 'Settings', to: '/settings', key: 'settings' }
]
</script>

<template>
  <nav class="nav">
    <RouterLink v-for="tab in tabs" :key="tab.to" :to="tab.to">
      <span>{{ icons[tab.key] }}</span>
      <small>{{ tab.label }}</small>
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: 0; width: 100%; max-width: 600px;
  display: flex; justify-content: space-around;
  background: var(--card); border-top: 1px solid var(--line);
  padding: 6px 0;
}
.nav a {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  color: var(--muted); font-size: 20px; text-decoration: none;
}
.nav small { font-size: 12px; }
.nav a.router-link-exact-active { color: var(--accent); }
</style>