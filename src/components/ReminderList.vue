<script setup>
import ReminderItem from './ReminderItem.vue'

const props = defineProps({
  title: String,
  mode: String,
  reminders: {
    type: Array,
    default: () => []
  }
})

defineEmits(['toggle', 'flag', 'remove', 'edit'])

function subtitle() {
  const n = props.reminders.length

  if (props.mode === 'scheduled') return 'Upcoming reminders'
  if (props.mode === 'completed') return `${n} completed reminders`

  return `${n} reminders`
}

function dateLabel(date) {
  if (!date) return 'No date'

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date === tomorrow.toLocaleDateString('en-CA')) {
    return 'TOMORROW'
  }

  return new Date(date + 'T00:00').toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric' }
  ).toUpperCase()
}

function getGroups() {
  const groups = []

  for (const reminder of props.reminders) {
    let group = groups.find(g => g.date === reminder.due)

    if (!group) {
      group = {
        date: reminder.due,
        label: dateLabel(reminder.due),
        items: []
      }

      groups.push(group)
    }

    group.items.push(reminder)
  }

  return groups
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p class="sub">{{ subtitle() }}</p>

    <p v-if="reminders.length === 0" class="sub">
      No reminders here yet.
    </p>

    <template v-if="mode === 'scheduled'">
      <div v-for="group in getGroups()" :key="group.date">
        <h3>{{ group.label }}</h3>

        <div class="items">
          <ReminderItem
            v-for="item in group.items"
            :key="item.id"
            :item="item"
            :mode="mode"
            @toggle="$emit('toggle', $event)"
            @flag="$emit('flag', $event)"
            @remove="$emit('remove', $event)"
            @edit="$emit('edit', $event)"
          />
        </div>
      </div>
    </template>

    <div v-else class="items">
      <ReminderItem
        v-for="item in reminders"
        :key="item.id"
        :item="item"
        :mode="mode"
        @toggle="$emit('toggle', $event)"
        @flag="$emit('flag', $event)"
        @remove="$emit('remove', $event)"
        @edit="$emit('edit', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.sub {
  color: var(--muted);
}

.items {
  background: var(--card);
  border-radius: 12px;
}

h3 {
  margin: 16px 4px 8px;
  font-size: 14px;
  color: var(--muted);
}
</style>