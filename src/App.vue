<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import ReminderForm from './components/ReminderForm.vue'
import TemplatePicker from './components/TemplatePicker.vue'
import BottomNav from './components/BottomNav.vue'
import { themes } from './themes.js'

const router = useRouter()

function loadData(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : defaultValue
  } catch {
    return defaultValue
  }
}

const reminders = ref(loadData('reminders', []))
const lists = ref(loadData('lists', ['Personal', 'School', 'Shopping']))
const settings = ref(loadData('settings', {
  darkMode: false,
  notifications: true,
  sound: true,
  showCompleted: true,
  showFlagged: true
}))
const currentTheme = ref(loadData('theme', 'classic'))
const showForm = ref(false)
const showTemplates = ref(false)
const editingReminder = ref(null)

let nextId = reminders.value.length
  ? Math.max(...reminders.value.map(r => Number(r.id) || 0)) + 1
  : 1

watch(reminders, value => {
  localStorage.setItem('reminders', JSON.stringify(value))
}, { deep: true })

watch(lists, value => {
  localStorage.setItem('lists', JSON.stringify(value))
}, { deep: true })

watch(settings, value => {
  localStorage.setItem('settings', JSON.stringify(value))
}, { deep: true })

watch(currentTheme, value => {
  localStorage.setItem('theme', JSON.stringify(value))
})

function localDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getTheme() {
  return themes.find(t => t.id === currentTheme.value) || themes[0]
}

function getThemeStyle() {
  const theme = getTheme()

  if (settings.value.darkMode || theme.dark) {
    return {
      '--bg': '#000000',
      '--card': '#1c1c1e',
      '--text': '#f5f5f7',
      '--line': '#38383a',
      '--muted': '#98989f',
      '--accent': theme.accent,
      'color-scheme': 'dark'
    }
  }

  return {
    '--bg': theme.bg,
    '--card': theme.card,
    '--text': theme.text,
    '--line': theme.line,
    '--muted': theme.muted,
    '--accent': theme.accent,
    'color-scheme': 'light'
  }
}

function pickTheme(id) {
  currentTheme.value = id
  showTemplates.value = false
}

function goTo(view) {
  const fixedRoutes = {
    home: '/',
    reminders: '/reminders',
    lists: '/lists',
    about: '/about',
    settings: '/settings'
  }

  if (fixedRoutes[view]) {
    router.push(fixedRoutes[view])
    return
  }

  router.push({
    name: 'list',
    params: { name: view }
  })
}

function openAddForm() {
  editingReminder.value = null
  showForm.value = true
}

function openEditForm(id) {
  const reminder = reminders.value.find(item => item.id === id)

  if (!reminder || reminder.done) return

  editingReminder.value = { ...reminder }
  showForm.value = true
}

function closeReminderForm() {
  showForm.value = false
  editingReminder.value = null
}

function saveReminder(data) {
  if (editingReminder.value) {
    const existing = reminders.value.find(
      item => item.id === editingReminder.value.id
    )

    if (existing) {
      existing.title = data.title
      existing.due = data.due
      existing.time = data.time
      existing.list = data.list
      existing.flagged = data.flagged
      existing.urgent = data.urgent
    }
  } else {
    reminders.value.push({
      id: nextId++,
      ...data,
      done: false,
      doneDate: ''
    })
  }

  closeReminderForm()
}

const reservedNames = [
  'Today', 'Scheduled', 'All', 'Flagged', 'Urgent', 'Completed'
]

function isNameTaken(name) {
  const normalized = String(name).trim().toLowerCase()

  return [...reservedNames, ...lists.value]
    .some(existing => existing.toLowerCase() === normalized)
}

function addList(name) {
  const cleaned = String(name).trim()
  if (!cleaned) return

  if (isNameTaken(cleaned)) {
    alert('That list name is already used.')
    return
  }

  lists.value.push(cleaned)
}

function renameList(oldName, newName) {
  const cleaned = String(newName).trim()
  if (!cleaned || oldName === cleaned) return

  if (isNameTaken(cleaned)) {
    alert('That list name is already used.')
    return
  }

  const index = lists.value.indexOf(oldName)
  if (index === -1) return

  lists.value[index] = cleaned

  reminders.value.forEach(reminder => {
    if (reminder.list === oldName) {
      reminder.list = cleaned
    }
  })
}

function deleteList(name) {
  if (lists.value.length <= 1) {
    alert('You need at least one list.')
    return
  }

  lists.value = lists.value.filter(list => list !== name)
  reminders.value = reminders.value.filter(
    reminder => reminder.list !== name
  )
}

function toggleDone(id) {
  const item = reminders.value.find(reminder => reminder.id === id)
  if (!item) return

  item.done = !item.done
  item.doneDate = item.done ? localDate() : ''
}

function toggleFlag(id) {
  const item = reminders.value.find(reminder => reminder.id === id)

  if (item) {
    item.flagged = !item.flagged
  }
}

function deleteReminder(id) {
  reminders.value = reminders.value.filter(
    reminder => reminder.id !== id
  )
}

function toggleSetting(key) {
  if (Object.prototype.hasOwnProperty.call(settings.value, key)) {
    settings.value[key] = !settings.value[key]
  }
}

function getVisible(view) {
  const today = localDate()

  if (view === 'Completed') {
    return reminders.value.filter(reminder => reminder.done)
  }

  const active = reminders.value.filter(reminder => !reminder.done)

  if (view === 'Today') {
    return active.filter(reminder => reminder.due === today)
  }

  if (view === 'Scheduled') {
    return active
      .filter(reminder => reminder.due && reminder.due > today)
      .sort((a, b) =>
        `${a.due || ''}${a.time || ''}`.localeCompare(
          `${b.due || ''}${b.time || ''}`
        )
      )
  }

  if (view === 'All') return active
  if (view === 'Flagged') return active.filter(reminder => reminder.flagged)
  if (view === 'Urgent') return active.filter(reminder => reminder.urgent)

  return active.filter(reminder => reminder.list === view)
}

function getCounts() {
  const names = [
    'Today', 'Scheduled', 'All', 'Flagged',
    'Urgent', 'Completed', ...lists.value
  ]

  const counts = {}

  for (const name of names) {
    counts[name] = getVisible(name).length
  }

  return counts
}

function getMode(view) {
  if (view === 'Scheduled') return 'scheduled'
  if (view === 'Completed') return 'completed'

  return 'normal'
}

function getViewProps(route) {
  if (route.name === 'home') {
    return {
      counts: getCounts(),
      lists: lists.value,
      settings: settings.value,
      reminders: reminders.value,
      icons: getTheme().icons.tiles
    }
  }

  if (route.name === 'list') {
    return {
      title: route.params.name,
      mode: getMode(route.params.name),
      reminders: getVisible(route.params.name)
    }
  }

  if (route.name === 'reminders') {
    return {
      reminders: getVisible('All')
    }
  }

  if (route.name === 'lists') {
    return {
      lists: lists.value,
      counts: getCounts()
    }
  }

  if (route.name === 'settings') {
    return {
      settings: settings.value,
      lists: lists.value
    }
  }

  return {}
}
</script>

<template>
  <div class="wrapper" :style="getThemeStyle()">
    <div class="app">
      <RouterView v-slot="{ Component, route }">
        <component
          :is="Component"
          v-bind="getViewProps(route)"
          @select="goTo"
          @add="openAddForm"
          @open-templates="showTemplates = true"
          @add-list="addList"
          @rename-list="renameList"
          @delete-list="deleteList"
          @toggle="toggleDone"
          @flag="toggleFlag"
          @remove="deleteReminder"
          @edit="openEditForm"
          @toggle-setting="toggleSetting"
        />
      </RouterView>
    </div>

    <ReminderForm
      v-if="showForm"
      :lists="lists"
      :reminder="editingReminder"
      @reminder-submitted="saveReminder"
      @cancel="closeReminderForm"
    />

    <TemplatePicker
      v-if="showTemplates"
      :current="currentTheme"
      @theme-picked="pickTheme"
      @cancel="showTemplates = false"
    />

    <button
      v-if="!['settings', 'about', 'lists'].includes($route.name)"
      class="add-button"
      aria-label="Add reminder"
      @click="openAddForm"
    >
      +
    </button>

    <BottomNav :icons="getTheme().icons.nav" />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background: var(--bg, #f2f2f7);
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
  color: inherit;
}

.wrapper {
  --bg: #f2f2f7;
  --card: #ffffff;
  --text: #111111;
  --line: #eeeeee;
  --muted: #8a8a8e;
  --accent: #0a84ff;

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  transition: background 0.2s ease, color 0.2s ease;
}

.app {
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 16px 140px;
}

.add-button {
  position: fixed;
  right: max(20px, calc(50% - 280px));
  bottom: 82px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 30px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
  z-index: 25;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.2);
}

/* Desktop and laptop layout */
@media (min-width: 900px) {
  .app {
    width: calc(100% - 260px);
    max-width: 1500px;
    min-height: 100vh;
    margin-left: 260px;
    margin-right: 0;
    padding: 40px clamp(28px, 4vw, 64px) 80px;
  }

  .add-button {
    right: 36px;
    bottom: 32px;
    width: 60px;
    height: 60px;
  }
}

/* Small laptop and tablet layout */
@media (min-width: 600px) and (max-width: 899px) {
  .app {
    max-width: 820px;
    padding: 28px 28px 120px;
  }

  .add-button {
    right: 28px;
    bottom: 88px;
  }
}
</style>