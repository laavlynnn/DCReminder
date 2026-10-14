import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '../components/HomeScreen.vue'
import ReminderList from '../components/ReminderList.vue'
import SettingsScreen from '../components/SettingsScreen.vue'
import RemindersPage from '../components/RemindersPage.vue'
import ListsPage from '../components/ListsPage.vue'
import AboutPage from '../components/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  },
  {
    path: '/reminders',
    name: 'reminders',
    component: RemindersPage
  },
  {
    path: '/lists',
    name: 'lists',
    component: ListsPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/list/:name',
    name: 'list',
    component: ReminderList
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsScreen
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
