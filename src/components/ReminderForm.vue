<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  },
  reminder: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['reminder-submitted', 'cancel'])

const title = ref(props.reminder?.title ?? '')
const due = ref(props.reminder?.due ?? '')
const time = ref(props.reminder?.time ?? '')
const list = ref(props.reminder?.list ?? props.lists[0] ?? 'Personal')
const flagged = ref(props.reminder?.flagged ?? false)
const urgent = ref(props.reminder?.urgent ?? false)

const isEditing = computed(() => props.reminder !== null)

function submitForm() {
  const cleanedTitle = title.value.trim()
  if (!cleanedTitle) return

  emit('reminder-submitted', {
    title: cleanedTitle,
    due: due.value,
    time: time.value,
    list: list.value,
    flagged: flagged.value,
    urgent: urgent.value
  })
}
</script>

<template>
  <div class="overlay" @click.self="emit('cancel')">
    <form class="form" @submit.prevent="submitForm">
      <div class="header">
        <button type="button" class="cancel" @click="emit('cancel')">
          Cancel
        </button>

        <h2>{{ isEditing ? 'Edit Reminder' : 'New Reminder' }}</h2>

        <button type="submit" class="add">
          {{ isEditing ? 'Save' : 'Add' }}
        </button>
      </div>

      <div class="group">
        <input
          v-model="title"
          class="title-input"
          type="text"
          placeholder="Title"
          required
          maxlength="200"
        >
      </div>

      <div class="group">
        <label class="field">
          <span>📅 Date</span>
          <input v-model="due" type="date">
        </label>

        <label class="field">
          <span>⏰ Time</span>
          <input v-model="time" type="time">
        </label>
      </div>

      <div class="group">
        <label class="field">
          <span>📋 List</span>
          <select v-model="list" required>
            <option
              v-for="l in lists"
              :key="l"
              :value="l"
            >
              {{ l }}
            </option>
          </select>
        </label>
      </div>

      <div class="group">
        <label class="field">
          <span>🚩 Flagged</span>
          <input v-model="flagged" type="checkbox">
        </label>

        <label class="field">
          <span>❗ Urgent</span>
          <input v-model="urgent" type="checkbox">
        </label>
      </div>
    </form>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  z-index: 30;
}

.form {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 16px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.header h2 {
  margin: 0;
  font-size: 18px;
  text-align: center;
}

.header button {
  background: none;
  border: none;
  font-size: 16px;
  padding: 4px;
  white-space: nowrap;
}

.cancel {
  color: var(--muted);
}

.add {
  color: var(--accent);
  font-weight: bold;
}

.group {
  background: var(--card);
  border-radius: 12px;
  margin-bottom: 14px;
  overflow: hidden;
}

.title-input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 18px;
}

.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  font-size: 16px;
}

.field:last-child {
  border-bottom: none;
}

.field input[type='date'],
.field input[type='time'],
.field select {
  max-width: 60%;
  background: transparent;
  color: var(--text);
  border: none;
  font-size: 16px;
  text-align: right;
}

.field select option {
  background: var(--card);
  color: var(--text);
}

.field input[type='checkbox'] {
  width: 22px;
  height: 22px;
  accent-color: var(--accent);
}

input:focus,
select:focus {
  outline: none;
}
</style>