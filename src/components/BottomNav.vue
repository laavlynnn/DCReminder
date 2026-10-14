<script setup>
defineProps({
  icons: {
    type: Object,
    default: () => ({})
  }
})

const tabs = [
  { label: 'Home', to: '/', icon: '⌂' },
  { label: 'Reminders', to: '/reminders', icon: '☷' },
  { label: 'Lists', to: '/lists', icon: '▤' },
  { label: 'About', to: '/about', icon: 'ⓘ' },
  { label: 'Settings', to: '/settings', icon: '⚙' }
]
</script>

<template>
  <nav class="nav">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
    >
      <span class="nav-icon">{{ tab.icon }}</span>
      <small>{{ tab.label }}</small>
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--card);
  border-top: 1px solid var(--line);
  padding: 10px 4px calc(10px + env(safe-area-inset-bottom));
  z-index: 20;
}

.nav a {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--muted);
  text-decoration: none;
}

.nav-icon {
  font-size: 21px;
  line-height: 1.2;
}

.nav small {
  font-size: 10px;
  white-space: nowrap;
}

.nav a.router-link-exact-active {
  color: var(--accent);
}
</style>
