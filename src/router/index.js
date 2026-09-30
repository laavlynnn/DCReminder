import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '../components/HomeScreen.vue'
import ReminderList from '../components/ReminderList.vue'
import SettingsScreen from '../components/SettingsScreen.vue'

const routes = [
  { path: '/', name: 'home', component: HomeScreen },
  { path: '/list/:name', name: 'list', component: ReminderList },
  { path: '/settings', name: 'settings', component: SettingsScreen }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router