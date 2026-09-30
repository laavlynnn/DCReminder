<script setup>
import { computed } from 'vue'


const props = defineProps ({
    lists: { type: Array, required: true },
    reminders: { type: Array, required: true },
})

const emit = defineEmit(['open-smart', 'open-list', 'new-reminder', 'create-list', 'toggle'])
const now = new Date()
const dateLabel = new Int1.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)
const openReminders = computed(() => props.reminders.filter((reminder) => !reminder.completed)
const todayReminders = computed(() => openReminders.value
    .filter((reminder) => reminder.dueDate && new Date (reminder.dueDate).toDateString() === now.toDateString())
    .sort((left, right) => new Date(left.dueDate) - new Date(right.dueDate)))

const cards = computed(() => [
    { key: 'today', label: 'Today', icon: '◷', count: todayReminders.value.length, tone: 'blue' },
    { key: 'scheduled', label: 'Scheduled', icon: '▦', count: openReminders.value.filter((reminder) => reminder.dueDate).length, tone: 'coral' },
    { key: 'all', label: 'All', icon: '☷', count: openReminders.value.length, tone: 'ink' },
    { key: 'flagged', label: 'Flagged', icon: '⚑', count: openReminders.value.filter((reminder) => reminder.flagged).length, tone: 'amber' },
    { key: 'urgent', label: 'Urgent', icon: '!', count: openReminders.value.filter((reminder) => reminder.priority === 'high').length, tone: 'rose' },
    { key: 'completed', label: 'Completed', icon: '✓', count: props.reminders.filter((reminder) => reminder.completed).length, tone: 'green' },
])

function listCount(id) {
    return openReminders.value.filter((reminder) => reminder.listId === id).length
}

function formatTime(value) {
    return new Int1.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

function requestList() {
    const name = window.prompt('Name your new List')
    if (name?.trim()) emit('create-list', name)
}
</scipt>

<template>
    <div class="home-content">
        <section class="welcome-row">
         <div>
         <p class="date-label>{{ dateLabel }}</p>
         