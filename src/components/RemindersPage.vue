<script setup>
import ReminderItem from './ReminderItem.vue'

defineProps({
  reminders: {
    type: Array,
    default: () => []
  }
})

defineEmits(['toggle', 'flag', 'remove', 'edit', 'select'])
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="heading">
        <h1>All Reminders</h1>
        <p class="subtitle">
          Manage all your active reminders in one place.
        </p>
      </div>

      <button
        class="back-button"
        @click="$emit('select', 'home')"
      >
        ← Back to Home
      </button>
    </div>

    <div class="summary">
      <strong>{{ reminders.length }}</strong>
      <span>active reminders</span>
    </div>

    <div v-if="reminders.length === 0" class="empty">
      <h3>You're all caught up!</h3>
      <p>No active reminders yet. Add one using the + button.</p>
    </div>

    <div v-else class="reminder-box">
      <ReminderItem
        v-for="item in reminders"
        :key="item.id"
        :item="item"
        mode="normal"
        @toggle="$emit('toggle', $event)"
        @flag="$emit('flag', $event)"
        @remove="$emit('remove', $event)"
        @edit="$emit('edit', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 8px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.heading {
  flex: 1;
  min-width: 0;
}

h1 {
  margin: 0 0 6px;
}

.subtitle {
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.back-button {
  flex-shrink: 0;
  padding: 10px 12px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px;
  margin: 20px 0;
  background: var(--card);
  border-radius: 14px;
}

.summary strong {
  font-size: 30px;
  color: var(--accent);
}

.summary span {
  color: var(--muted);
}

.reminder-box {
  background: var(--card);
  border-radius: 14px;
  overflow: hidden;
}

.empty {
  text-align: center;
  padding: 36px 18px;
  background: var(--card);
  border-radius: 14px;
}

.empty p {
  color: var(--muted);
}

@media (max-width: 380px) {
  .page-header {
    gap: 8px;
  }

  .back-button {
    padding: 8px;
    font-size: 11px;
  }
}
</style>