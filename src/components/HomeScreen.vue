<script setup>
import { ref } from 'vue'

defineProps({
  counts: Object,
  lists: Array,
  settings: Object,
  reminders: Array
})

defineEmits(['select', 'add'])

const showSearch = ref(false)
const searchText = ref('')

const tiles = [
  { name: 'Today', color: '#0a84ff', icon: '📅' },
  { name: 'Scheduled', color: '#ff453a', icon: '🗓' },
  { name: 'All', color: '#636366', icon: '📥' },
  { name: 'Flagged', color: '#ff9f0a', icon: '🚩' },
  { name: 'Urgent', color: '#ff375f', icon: '⏰' },
  { name: 'Completed', color: '#8e8e93', icon: '✓' }
]

function isShown(name, settings) {
  if (name === 'Flagged') return settings.showFlagged
  if (name === 'Completed') return settings.showCompleted
  return true
}

function searchResults(reminders) {
  const text = searchText.value.toLowerCase()
  return reminders.filter(r => r.title.toLowerCase().includes(text))
}
</script>

<template>
  <div>
    <div class="top-bar">
      <button @click="showSearch = !showSearch">🔍</button>
      <button @click="$emit('add')">+</button>
      <button @click="$emit('select', 'settings')">•••</button>
    </div>

    <input
      v-if="showSearch"
      v-model="searchText"
      class="search"
      type="text"
      placeholder="Search reminders"
    >

    <div v-if="showSearch && searchText !== ''" class="box">
      <p v-if="searchResults(reminders).length === 0" class="empty">No results.</p>
      <div v-for="r in searchResults(reminders)" :key="r.id" class="row">
        <span>{{ r.title }}</span>
        <small>{{ r.due }}</small>
      </div>
    </div>

    <template v-else>
      <div class="tiles">
        <template v-for="tile in tiles" :key="tile.name">
          <button
            v-if="isShown(tile.name, settings)"
            class="tile"
            @click="$emit('select', tile.name)"
          >
            <div class="tile-top">
              <span class="dot" :style="{ background: tile.color }">{{ tile.icon }}</span>
              <strong>{{ counts[tile.name] }}</strong>
            </div>
            <span>{{ tile.name }}</span>
          </button>
        </template>
      </div>

      <h2>My Lists</h2>
      <div class="box">
        <button
          v-for="list in lists"
          :key="list"
          class="row"
          @click="$emit('select', list)"
        >
          <span>○ {{ list }}</span>
          <span>{{ counts[list] }} ›</span>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.top-bar { display: flex; justify-content: flex-end; gap: 12px; }
.top-bar button { background: none; border: none; font-size: 20px; }
.search {
  width: 100%; box-sizing: border-box; padding: 10px; font-size: 16px;
  margin-bottom: 12px; border: 1px solid var(--line); border-radius: 10px;
  background: var(--card); color: var(--text);
}
.tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tile {
  background: var(--card); border: none; border-radius: 12px;
  padding: 12px; text-align: left; font-size: 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.tile-top { display: flex; justify-content: space-between; align-items: center; }
.tile-top strong { font-size: 28px; }
.dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.box { background: var(--card); border-radius: 12px; }
.row {
  display: flex; justify-content: space-between; width: 100%; box-sizing: border-box;
  background: none; border: none; border-bottom: 1px solid var(--line);
  padding: 14px; font-size: 16px;
}
.empty { padding: 14px; color: var(--muted); }
</style>