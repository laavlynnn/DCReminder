<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import ReminderForm from './components/ReminderForm.vue'
import TemplatePicker from './components/TemplatePicker.vue'
import BottomNav from './components/BottomNav.vue'
import { themes } from './themes.js'

const router = useRouter()

function loadData(key, defaultValue) {
  const saved = localStorage.getItem(key)
  if (saved) {
    return JSON.parse(saved)
  }
  return defaultValue
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
let nextId = 1
if (reminders.value.length > 0) {
  nextId = Math.max(...reminders.value.map(r => r.id)) + 1
}

// save to localStorage every time the data changes
watch(reminders, () => {
  localStorage.setItem('reminders', JSON.stringify(reminders.value))
}, { deep: true })

watch(lists, () => {
  localStorage.setItem('lists', JSON.stringify(lists.value))
}, { deep: true })

watch(settings, () => {
  localStorage.setItem('settings', JSON.stringify(settings.value))
}, { deep: true })

watch(currentTheme, () => {
  localStorage.setItem('theme', JSON.stringify(currentTheme.value))
})

function localDate() {
  return new Date().toLocaleDateString('en-CA')
}

// finds the chosen theme (colors and icons)
function getTheme() {
  return themes.find(t => t.id === currentTheme.value) || themes[0]
}

// gives the colors for the chosen theme (dark mode makes it dark)
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
    '--accent': theme.accent
  }
}

function pickTheme(id) {
  currentTheme.value = id
  showTemplates.value = false
}

function goTo(view) {
  if (view === 'settings') {
    router.push({ name: 'settings' })
  } else {
    router.push({ name: 'list', params: { name: view } })
  }
}

function addReminder(data) {
  reminders.value.push({ id: nextId, ...data, done: false, doneDate: '' })
  nextId++
  showForm.value = false
}

// list names that cannot be used again
const reservedNames = ['Today', 'Scheduled', 'All', 'Flagged', 'Urgent', 'Completed']

function isNameTaken(name) {
  const allNames = [...reservedNames, ...lists.value].map(n => n.toLowerCase())
  return allNames.includes(name.toLowerCase())
}

function addList(name) {
  if (isNameTaken(name)) {
    alert('That list name is already used.')
    return
  }
  lists.value.push(name)
}

function renameList(oldName, newName) {
  if (oldName === newName) return
  if (isNameTaken(newName)) {
    alert('That list name is already used.')
    return
  }
  const index = lists.value.indexOf(oldName)
  lists.value[index] = newName
  for (const r of reminders.value) {
    if (r.list === oldName) {
      r.list = newName
    }
  }
}

function deleteList(name) {
  if (lists.value.length === 1) {
    alert('You need at least one list.')
    return
  }
  lists.value = lists.value.filter(l => l !== name)
  reminders.value = reminders.value.filter(r => r.list !== name)
}

function toggleDone(id) {
  const item = reminders.value.find(r => r.id === id)
  item.done = !item.done
  item.doneDate = item.done ? localDate() : ''
}

function toggleFlag(id) {
  const item = reminders.value.find(r => r.id === id)
  item.flagged = !item.flagged
}

function deleteReminder(id) {
  reminders.value = reminders.value.filter(r => r.id !== id)
}

function toggleSetting(key) {
  settings.value[key] = !settings.value[key]
}

function getVisible(view) {
  const today = localDate()
  if (view === 'Completed') return reminders.value.filter(r => r.done)

  const active = reminders.value.filter(r => !r.done)
  if (view === 'Today') return active.filter(r => r.due === today)
  if (view === 'Scheduled') {
    return active
      .filter(r => r.due > today)
      .sort((a, b) => (a.due + a.time).localeCompare(b.due + b.time))
  }
  if (view === 'All') return active
  if (view === 'Flagged') return active.filter(r => r.flagged)
  if (view === 'Urgent') return active.filter(r => r.urgent)
  return active.filter(r => r.list === view)
}

function getCounts() {
  const names = ['Today', 'Scheduled', 'All', 'Flagged', 'Urgent', 'Completed', ...lists.value]
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

// decides which props each page (route) receives
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
          @add="showForm = true"
          @open-templates="showTemplates = true"
          @add-list="addList"
          @rename-list="renameList"
          @delete-list="deleteList"
          @toggle="toggleDone"
          @flag="toggleFlag"
          @remove="deleteReminder"
          @toggle-setting="toggleSetting"
        />
      </RouterView>
    </div>

    <ReminderForm
      v-if="showForm"
      :lists="lists"
      @reminder-submitted="addReminder"
      @cancel="showForm = false"
    />

    <TemplatePicker
      v-if="showTemplates"
      :current="currentTheme"
      @theme-picked="pickTheme"
      @cancel="showTemplates = false"
    />

    <button v-if="$route.name !== 'settings'" class="add-button" @click="showForm = true">+</button>

    <BottomNav :icons="getTheme().icons.nav" />
  </div>
</template>

<style>
body { margin: 0; font-family: Arial, sans-serif; }
.wrapper {
  --bg: #f2f2f7; --card: #ffffff; --text: #111111; --line: #eeeeee; --muted: #8a8a8e; --accent: #0a84ff;
  background: var(--bg); color: var(--text); min-height: 100vh;
}
.app { max-width: 600px; margin: 0 auto; padding: 16px 16px 140px; }
.add-button {
  position: fixed; bottom: 80px;
  right: max(20px, calc(50% - 280px));
  width: 56px; height: 56px; border-radius: 50%;
  border: none; background: var(--accent); color: white; font-size: 30px;
}
button { cursor: pointer; color: inherit; }
</style>