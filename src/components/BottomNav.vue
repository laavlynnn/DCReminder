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
    <div class="brand">
      <div class="brand-mark">✓</div>

      <div class="brand-text">
        <strong>DC Reminder</strong>
        <small>Stay on track</small>
      </div>
    </div>

    <p class="nav-heading">MENU</p>

    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="nav-link"
    >
      <span class="nav-icon">{{ tab.icon }}</span>
      <span class="nav-label">{{ tab.label }}</span>
    </RouterLink>

    <div class="sidebar-footer">
      <span class="footer-dot"></span>
      <span>Your day, organized.</span>
    </div>
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
  gap: 4px;
  background: var(--card);
  border-top: 1px solid var(--line);
  padding: 10px 4px calc(10px + env(safe-area-inset-bottom));
  z-index: 20;
}

.brand {
  display: none;
}

.nav-heading {
  display: none;
}

.nav-link {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 2px;
  color: var(--muted);
  text-decoration: none;
  border-radius: 10px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-icon {
  font-size: 21px;
  line-height: 1.2;
}

.nav-label {
  font-size: 10px;
  white-space: nowrap;
}

.nav-link.router-link-exact-active {
  color: var(--accent);
}

.sidebar-footer {
  display: none;
}

/* Desktop sidebar */
@media (min-width: 900px) {
  .nav {
    left: 0;
    top: 0;
    bottom: 0;
    transform: none;
    width: 260px;
    max-width: none;
    height: 100vh;
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 8px;
    padding: 32px 18px 22px;
    background: var(--card);
    border-top: none;
    border-right: 1px solid var(--line);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 8px 30px;
  }

  .brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: var(--accent);
    color: white;
    font-size: 25px;
    font-weight: bold;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .brand-text strong {
    color: var(--text);
    font-size: 18px;
    letter-spacing: -0.4px;
  }

  .brand-text small {
    color: var(--muted);
    font-size: 12px;
  }

  .nav-heading {
    display: block;
    margin: 4px 10px 8px;
    color: var(--muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  .nav-link {
    flex: 0 0 auto;
    min-height: 48px;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 10px;
  }

  .nav-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    font-size: 22px;
  }

  .nav-label {
    font-size: 14px;
    font-weight: 500;
  }

  .nav-link:hover {
    background: var(--bg);
    color: var(--text);
  }

  .nav-link.router-link-exact-active {
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    color: var(--accent);
    font-weight: 600;
  }

  .sidebar-footer {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: auto;
    padding: 18px 10px 8px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 12px;
  }

  .footer-dot {
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--accent);
  }
}
</style>