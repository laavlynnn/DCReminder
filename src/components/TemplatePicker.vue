<script setup>
import { ref } from 'vue'
import { themes } from '../themes.js'

const props = defineProps({
  current: String
})

const emit = defineEmits(['theme-picked', 'cancel'])

const selected = ref(props.current)
</script>

<template>
  <div class="overlay" @click.self="emit('cancel')">
    <div class="sheet">
      <div class="header">
        <button class="cancel" @click="emit('cancel')">Cancel</button>
        <h2>Themes</h2>
        <button class="done" @click="emit('theme-picked', selected)">Done</button>
      </div>

      <p class="hint">Choose a design and color for your app.</p>

      <div class="grid">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="theme"
          @click="selected = theme.id"
        >
          <div
            class="preview"
            :style="{
              background: theme.bg,
              borderColor: selected === theme.id ? theme.accent : 'var(--line)'
            }"
          >
            <div class="mini-grid">
              <div
                v-for="(dot, i) in theme.dots"
                :key="i"
                class="mini-card"
                :style="{ background: theme.card }"
              >
                <span class="mini-dot" :style="{ background: dot }"></span>
              </div>
            </div>
            <div class="mini-bar" :style="{ background: theme.card }"></div>

            <span
              v-if="selected === theme.id"
              class="check"
              :style="{ background: theme.accent }"
            >✓</span>
          </div>

          <strong>{{ theme.name }}</strong>
          <small>{{ theme.style }}</small>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  padding: 16px; box-sizing: border-box;
}
.sheet {
  background: var(--bg); color: var(--text);
  border: 1px solid var(--line); border-radius: 20px;
  padding: 16px; width: 100%; max-width: 420px; box-sizing: border-box;
  max-height: 90vh; overflow-y: auto;
}
.header { display: flex; justify-content: space-between; align-items: center; }
.header h2 { margin: 0; font-size: 18px; }
.header button { background: none; border: none; font-size: 16px; padding: 4px; }
.cancel { color: var(--muted); }
.done { color: var(--accent); font-weight: bold; }
.hint { color: var(--muted); text-align: center; font-size: 14px; }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.theme {
  background: none; border: none; padding: 0; text-align: left;
  display: flex; flex-direction: column; gap: 2px; font-size: 14px;
}
.theme small { color: var(--muted); font-size: 12px; }

.preview {
  position: relative; border: 2px solid var(--line);
  border-radius: 12px; padding: 8px; margin-bottom: 4px;
}
.mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
.mini-card { height: 26px; border-radius: 6px; padding: 5px; box-sizing: border-box; }
.mini-dot { display: block; width: 9px; height: 9px; border-radius: 50%; }
.mini-bar { margin-top: 6px; height: 8px; border-radius: 4px; }
.check {
  position: absolute; top: -8px; right: -8px;
  width: 20px; height: 20px; border-radius: 50%;
  color: white; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
}
</style>