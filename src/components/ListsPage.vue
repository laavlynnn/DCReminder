<script setup>
defineProps({
  lists: {
    type: Array,
    default: () => []
  },
  counts: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'add-list',
  'rename-list',
  'delete-list',
  'select'
])

function addList() {
  const name = prompt('Enter a name for the new list:')
  if (name && name.trim()) {
    emit('add-list', name.trim())
  }
}

function renameList(list) {
  const name = prompt('Enter the new list name:', list)
  if (name && name.trim()) {
    emit('rename-list', list, name.trim())
  }
}

function deleteList(list) {
  if (confirm(`Delete "${list}" and all reminders in this list?`)) {
    emit('delete-list', list)
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="heading">
        <h1>My Lists</h1>
        <p class="subtitle">
          Organize your reminders by category.
        </p>
      </div>

      <button
        class="back-button"
        @click="$emit('select', 'home')"
      >
        ← Back to Home
      </button>
    </div>

    <div class="list-box">
      <div
        v-for="list in lists"
        :key="list"
        class="list-row"
      >
        <button
          class="list-main"
          @click="$emit('select', list)"
        >
          <span class="list-icon">○</span>
          <span class="list-name">{{ list }}</span>
          <span class="count">{{ counts[list] ?? 0 }}</span>
        </button>

        <button
          class="action"
          aria-label="Rename list"
          @click="renameList(list)"
        >
          ✎
        </button>

        <button
          class="action delete"
          aria-label="Delete list"
          @click="deleteList(list)"
        >
          🗑
        </button>
      </div>
    </div>

    <button class="add-list" @click="addList">
      ＋ Add New List
    </button>
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

.list-box {
  background: var(--card);
  border-radius: 14px;
  overflow: hidden;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--line);
}

.list-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  text-align: left;
  background: none;
  border: none;
  min-width: 0;
  cursor: pointer;
}

.list-icon {
  color: var(--accent);
  font-size: 20px;
}

.list-name {
  flex: 1;
  overflow-wrap: anywhere;
}

.count {
  color: var(--muted);
}

.action {
  background: none;
  border: none;
  padding: 8px 4px;
  font-size: 17px;
  cursor: pointer;
}

.delete {
  color: #ff453a;
}

.add-list {
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: var(--accent);
  font-size: 15px;
  cursor: pointer;
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