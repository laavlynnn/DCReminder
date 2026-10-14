<template>
  <div class="page">
    <div class="hero">
      <div class="app-icon">✦</div>
      <h1>DC Reminder</h1>
      <p class="subtitle">Your tasks. Your time. Your focus.</p>
    </div>

    <section class="card">
      <h2>About the Application</h2>
      <p>
        DC Reminder is a VueJS single-page application designed to help users
        create, organize, and track reminders in one convenient place.
      </p>
    </section>

    <section class="card">
      <h2>Key Features</h2>
      <ul>
        <li>Create reminders with dates and times.</li>
        <li>View reminders by category and schedule.</li>
        <li>Update reminders by marking them completed or flagging them.</li>
        <li>Delete reminders that are no longer needed.</li>
        <li>Create and manage custom lists.</li>
        <li>Customize themes and application settings.</li>
        <li>Save data locally in the browser.</li>
      </ul>
    </section>

    <section class="card">
      <h2>Technologies Used</h2>
      <div class="technology">Vue 3</div>
      <div class="technology">Vue Router</div>
      <div class="technology">JavaScript</div>
      <div class="technology">HTML and CSS</div>
      <div class="technology">LocalStorage</div>
    </section>

    <p class="footer">Made as a VueJS project.</p>
  </div>
</template>

<style scoped>
.page { padding-top: 8px; }
.hero { text-align: center; padding: 28px 12px; }
.app-icon {
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border-radius: 22px;
  background: var(--accent);
  color: white;
  font-size: 38px;
}
.hero h1 { margin: 0 0 8px; }
.subtitle, .footer { color: var(--muted); }
.card {
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: var(--card);
}
.card h2 { font-size: 17px; margin-top: 0; }
.card p, .card li { line-height: 1.7; }
.card ul { padding-left: 20px; margin-bottom: 0; }
.technology {
  display: inline-block;
  margin: 4px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 20px;
  font-size: 13px;
}
.footer { text-align: center; padding: 12px; }
</style>
