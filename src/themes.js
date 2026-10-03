export const themes = [
  {
    id: 'classic', name: 'Classic', style: 'Light · blue', dark: false,
    bg: '#f2f2f7', card: '#ffffff', text: '#111111', line: '#eeeeee', muted: '#8a8a8e',
    accent: '#0a84ff', dots: ['#0a84ff', '#ff453a', '#636366', '#ff9f0a'],
    icons: {
      nav: { home: '🏠', today: '📅', schedule: '🗓', done: '✓', settings: '⚙' },
      tiles: { Today: '📅', Scheduled: '🗓', All: '📥', Flagged: '🚩', Urgent: '⏰', Completed: '✓' }
    }
  },
  {
    id: 'rose', name: 'Rose', style: 'Soft · pink', dark: false,
    bg: '#fdf0f3', card: '#ffffff', text: '#111111', line: '#eeeeee', muted: '#8a8a8e',
    accent: '#ec5a85', dots: ['#ec5a85', '#f4a3b9', '#f4a3b9', '#ec5a85'],
    icons: {
      nav: { home: '🌸', today: '🌷', schedule: '💌', done: '💖', settings: '🎀' },
      tiles: { Today: '🌷', Scheduled: '💌', All: '🌸', Flagged: '🎀', Urgent: '💗', Completed: '💖' }
    }
  },
  {
    id: 'forest', name: 'Forest', style: 'Calm · green', dark: false,
    bg: '#eef5ee', card: '#ffffff', text: '#111111', line: '#eeeeee', muted: '#8a8a8e',
    accent: '#2f9e5b', dots: ['#2f9e5b', '#8cc9a2', '#8cc9a2', '#2f9e5b'],
    icons: {
      nav: { home: '🌲', today: '🌿', schedule: '🍃', done: '🍀', settings: '🍄' },
      tiles: { Today: '🌿', Scheduled: '🍃', All: '🌲', Flagged: '🍂', Urgent: '🐝', Completed: '🍀' }
    }
  },
  {
    id: 'lavender', name: 'Lavender', style: 'Dreamy · purple', dark: false,
    bg: '#f1eefb', card: '#ffffff', text: '#111111', line: '#eeeeee', muted: '#8a8a8e',
    accent: '#7a5af8', dots: ['#7a5af8', '#b8a6fb', '#b8a6fb', '#7a5af8'],
    icons: {
      nav: { home: '🔮', today: '🦋', schedule: '🌙', done: '💜', settings: '✨' },
      tiles: { Today: '🦋', Scheduled: '🌙', All: '🔮', Flagged: '💫', Urgent: '⚡', Completed: '💜' }
    }
  },
  {
    id: 'sunset', name: 'Sunset', style: 'Warm · orange', dark: false,
    bg: '#fff4e8', card: '#ffffff', text: '#111111', line: '#eeeeee', muted: '#8a8a8e',
    accent: '#f08a24', dots: ['#f08a24', '#f7c28a', '#f7c28a', '#f08a24'],
    icons: {
      nav: { home: '🌅', today: '☀️', schedule: '🌇', done: '🌴', settings: '🐚' },
      tiles: { Today: '☀️', Scheduled: '🌇', All: '🌅', Flagged: '🍊', Urgent: '🔥', Completed: '🌴' }
    }
  },
  {
    id: 'midnight', name: 'Midnight', style: 'Dark · multicolor', dark: true,
    bg: '#000000', card: '#1c1c1e', text: '#f5f5f7', line: '#38383a', muted: '#98989f',
    accent: '#0a84ff', dots: ['#0a84ff', '#30d158', '#ff9f0a', '#ff453a'],
    icons: {
      nav: { home: '🌙', today: '⭐', schedule: '🌌', done: '🌟', settings: '🔭' },
      tiles: { Today: '⭐', Scheduled: '🌌', All: '🌙', Flagged: '☄️', Urgent: '🚀', Completed: '🌟' }
    }
  }
]