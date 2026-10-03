<script setup>
const props = defineProps({
  item: Object,
  mode: String
})

defineEmits(['toggle', 'flag', 'remove'])

function formatTime(time) {
  if (!time) return ''
  const [h, m] = time.split(':')
  const hour = Number(h)
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}

function doneLabel() {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (props.item.doneDate === today.toLocaleDateString('en-CA')) return 'Today'
  if (props.item.doneDate === yesterday.toLocaleDateString('en-CA')) return 'Yesterday'
  return new Date(props.item.doneDate + 'T00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function subtext() {
  if (props.mode === 'completed') return doneLabel()
  const parts = []
  if (props.mode === 'normal' && props.item.due) parts.push(props.item.due)
  if (props.item.time) parts.push(formatTime(props.item.time))
  return parts.join(' • ')
}
</script>

<template>
  <div class="item">
    <input type="checkbox" :checked="item.done" @change="$emit('toggle', item.id)">

    <div class="info">
      <span :class="{ done: item.done }">{{ item.title }}</span>
      <small>{{ subtext() }}</small>
    </div>

    <button @click="$emit('flag', item.id)">{{ item.flagged ? '🚩' : '⚑' }}</button>
    <button @click="$emit('remove', item.id)">🗑</button>
  </div>
</template>

<style scoped>
.item { display: flex; align-items: center; gap: 10px; padding: 12px; border-bottom: 1px solid var(--line); }
.item input[type='checkbox'] { accent-color: var(--accent); width: 18px; height: 18px; }
.info { flex: 1; display: flex; flex-direction: column; }
.info small { color: var(--muted); }
.item button { background: none; border: none; font-size: 18px; }
.done { text-decoration: line-through; color: var(--muted); }
</style>