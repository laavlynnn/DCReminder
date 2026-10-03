<script setup>
import { ref } from 'vue'

defineProps({
  settings: Object,
  lists: Array
})

defineEmits(['toggle-setting', 'select'])

const showAbout = ref(false)
</script>

<template>
  <div>
    <h1>Settings</h1>

    <h3>APPEARANCE</h3>
    <div class="box">
      <div class="row">
        <span>🌙 Dark Mode</span>
        <button @click="$emit('toggle-setting', 'darkMode')">{{ settings.darkMode ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="row">
        <span>🔔 Notifications</span>
        <button @click="$emit('toggle-setting', 'notifications')">{{ settings.notifications ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="row">
        <span>🎵 Sound</span>
        <button @click="$emit('toggle-setting', 'sound')">{{ settings.sound ? 'ON' : 'OFF' }}</button>
      </div>
    </div>

    <h3>REMINDERS</h3>
    <div class="box">
      <div class="row">
        <span>✓ Show completed</span>
        <button @click="$emit('toggle-setting', 'showCompleted')">{{ settings.showCompleted ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="row">
        <span>🚩 Show flagged</span>
        <button @click="$emit('toggle-setting', 'showFlagged')">{{ settings.showFlagged ? 'ON' : 'OFF' }}</button>
      </div>
    </div>

    <h3>MY LISTS</h3>
    <div class="box">
      <button v-for="list in lists" :key="list" class="row" @click="$emit('select', list)">
        <span>○ {{ list }}</span>
        <span>›</span>
      </button>
    </div>

    <h3>ABOUT</h3>
    <div class="box">
      <button class="row" @click="showAbout = !showAbout">
        <span>ⓘ About my Reminders</span>
        <span>›</span>
      </button>
      <p v-if="showAbout" class="about">
        Reminder helps you keep organized. Create, organize, and track tasks with custom details.
      </p>
    </div>
  </div>
</template>

<style scoped>
h3 { margin: 20px 4px 8px; font-size: 14px; color: var(--muted); }
.box { background: var(--card); border-radius: 12px; }
.row {
  display: flex; justify-content: space-between; align-items: center;
  width: 100%; box-sizing: border-box; background: none; border: none;
  border-bottom: 1px solid var(--line); padding: 14px; font-size: 16px;
}
.row button { background: none; border: none; color: var(--accent); font-weight: bold; font-size: 16px; }
.about { padding: 0 14px 14px; color: var(--muted); }
</style>