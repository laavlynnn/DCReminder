<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import ReminderForm from './components/ReminderForm.vue'
import BottomNav from './components/BottomNav.vue'

const router = useRouter()

function loadData(key, defaultValue) {
  const saved = localStorage.getItem(key)
  if (saved) {
    return JSON.parse(saved)
  }
  return defaultValue
}

const reminders = ref(loadData('reminders', []))
const lists = ref(['Personal', 'School', 'Shopping'])
const settings = ref(loadData('settings', {
  darkMode: false,
  notifications: true,
  sound: true,
  showCompleted: true,
  showFlagged: true
}))
const showForm = ref(false)
let nextId = 1
if (reminders.value.length > 0) {
  nextId = Math.max(...reminders.value.map(r => r.id)) + 1
}

// save to localStorage every time the data changes
watch(reminders, () => {
  localStorage.setItem('reminders', JSON.stringify(reminders.value))
}, { deep: true })

watch(settings, () => {
  localStorage.setItem('settings', JSON.stringify(settings.value))
}, { deep: true })

function localDate() {
  return new Date().toLocaleDateString('en-CA')
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
      reminders: reminders.value
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
  <div class="wrapper" :class="{ dark: settings.darkMode }">
    <div class="app">
      <RouterView v-slot="{ Component, route }">
        <component
          :is="Component"
          v-bind="getViewProps(route)"
          @select="goTo"
          @add="showForm = true"
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

    <button v-if="$route.name !== 'settings'" class="add-button" @click="showForm = true">+</button>

    <BottomNav />
  </div>
</template>

<style>
body { margin: 0; font-family: Arial, sans-serif; }
.wrapper {
  --bg: #f2f2f7; --card: #ffffff; --text: #111111; --line: #eeeeee; --muted: #8a8a8e;
  background: var(--bg); color: var(--text); min-height: 100vh;
}
.wrapper.dark {
  --bg: #000000; --card: #1c1c1e; --text: #f5f5f7; --line: #38383a; --muted: #98989f;
  color-scheme: dark;
}
.app { max-width: 600px; margin: 0 auto; padding: 16px 16px 140px; }
.add-button {
  position: fixed; bottom: 80px;
  right: max(20px, calc(50% - 280px));
  width: 56px; height: 56px; border-radius: 50%;
  border: none; background: #0a84ff; color: white; font-size: 30px;
}
button { cursor: pointer; color: inherit; }
</style>