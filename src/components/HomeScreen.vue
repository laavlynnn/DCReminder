<script setup>
import { ref } from 'vue'

defineProps({
  counts: Object,
  lists: Array,
  settings: Object,
  reminders: Array,
  icons: Object
})

const emit = defineEmits([
  'select',
  'add',
  'open-templates',
  'add-list',
  'rename-list',
  'delete-list'
])

const showSearch = ref(false)
const searchText = ref('')
const showMenu = ref(false)
const editMode = ref(false)

const tiles = [
  { name: 'Today', color: '#0a84ff' },
  { name: 'Scheduled', color: '#ff453a' },
  { name: 'All', color: '#636366' },
  { name: 'Flagged', color: '#ff9f0a' },
  { name: 'Urgent', color: '#ff375f' },
  { name: 'Completed', color: '#8e8e93' }
]

function isShown(name, settings) {
  if (name === 'Flagged') return settings.showFlagged
  if (name === 'Completed') return settings.showCompleted
  return true
}

function searchResults(reminders) {
  const text = searchText.value.toLowerCase()
  return reminders.filter(r =>
    r.title.toLowerCase().includes(text)
  )
}

function startEdit() {
  editMode.value = true
  showMenu.value = false
}

function openTemplates() {
  showMenu.value = false
  emit('open-templates')
}

function addList() {
  const name = prompt('New list name')

  if (name && name.trim() !== '') {
    emit('add-list', name.trim())
  }
}

function renameList(list) {
  const newName = prompt('Rename list', list)

  if (newName && newName.trim() !== '') {
    emit('rename-list', list, newName.trim())
  }
}

function deleteList(list) {
  if (confirm(`Delete "${list}" and all its reminders?`)) {
    emit('delete-list', list)
  }
}
</script>

<template>
  <div>
    <div class="top-bar">
      <button @click="showSearch = !showSearch">🔍</button>
      <button @click="$emit('add')">+</button>

      <button
        v-if="editMode"
        class="done-btn"
        @click="editMode = false"
      >
        Done
      </button>

      <div v-else class="menu-wrap">
        <button @click="showMenu = !showMenu">•••</button>

        <div
          v-if="showMenu"
          class="backdrop"
          @click="showMenu = false"
        ></div>

        <div v-if="showMenu" class="menu">
          <button @click="startEdit">✎ Edit</button>
          <button @click="openTemplates">🎨 Themes</button>
        </div>
      </div>
    </div>

    <input
      v-if="showSearch"
      v-model="searchText"
      class="search"
      type="text"
      placeholder="Search reminders"
    >

    <div
      v-if="showSearch && searchText !== ''"
      class="box search-box"
    >
      <p
        v-if="searchResults(reminders).length === 0"
        class="empty"
      >
        No results.
      </p>

      <div
        v-for="r in searchResults(reminders)"
        :key="r.id"
        class="row"
      >
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
              <span
                class="dot"
                :style="{ background: tile.color }"
              >
                {{ icons[tile.name] }}
              </span>

              <strong>{{ counts[tile.name] }}</strong>
            </div>

            <span>{{ tile.name }}</span>
          </button>
        </template>
      </div>

      <h2>My Lists</h2>

      <div class="my-lists">
        <template v-for="list in lists" :key="list">
          <div v-if="editMode" class="row">
            <span>○ {{ list }}</span>

            <span class="actions">
              <button @click="renameList(list)">✎</button>
              <button @click="deleteList(list)">🗑</button>
            </span>
          </div>

          <button
            v-else
            class="row"
            @click="$emit('select', list)"
          >
            <span>○ {{ list }}</span>
            <span>{{ counts[list] }} ›</span>
          </button>
        </template>

        <button
          v-if="editMode"
          class="row add-row"
          @click="addList"
        >
          ＋ Add list
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.top-bar button {
  background: none;
  border: none;
  font-size: 20px;
}

.done-btn {
  color: var(--accent);
  font-weight: bold;
  font-size: 16px !important;
}

.menu-wrap {
  position: relative;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.menu {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 11;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  min-width: 160px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.menu button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  font-size: 16px;
  border-bottom: 1px solid var(--line);
}

.menu button:last-child {
  border-bottom: none;
}

.search {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);
  color: var(--text);
}

.tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tile {
  background: var(--card);
  border: none;
  border-radius: 12px;
  padding: 12px;
  text-align: left;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tile-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tile-top strong {
  font-size: 28px;
}

.dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

/* My Lists: remove the highlighted card background and outer border */
.my-lists {
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--line);
  padding: 14px;
  font-size: 16px;
  text-align: left;
}

.actions button {
  background: none;
  border: none;
  font-size: 18px;
  margin-left: 8px;
}

.add-row {
  color: var(--accent);
  justify-content: flex-start;
  border-bottom: none;
}

.search-box {
  background: var(--card);
  border-radius: 12px;
}

.empty {
  padding: 14px;
  color: var(--muted);
}
</style>