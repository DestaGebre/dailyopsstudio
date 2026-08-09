<template>
  <section class="site-section resource-feature" aria-labelledby="free-resource-title">
    <div class="resource-feature__content stack">
      <p class="resource-eyebrow">Free restaurant resource</p>
      <h2 id="free-resource-title">Restaurant Weekly Operations Review</h2>
      <p class="resource-feature__lead">
        Close out the week with clarity. Review unfinished work, check the areas that keep your restaurant running, and
        choose focused priorities for the week ahead.
      </p>
      <ul class="resource-check-list">
        <li>Review wins, lessons, and unfinished tasks</li>
        <li>Check customers, finances, operations, and workload</li>
        <li>Set three clear priorities for next week</li>
      </ul>
      <div class="home-hero__actions">
        <NuxtLink class="button button--primary" to="/resources">Get the free worksheet</NuxtLink>
        <NuxtLink class="button button--secondary" to="/blog/a-weekly-operations-review-for-small-businesses">
          Read the weekly review guide
        </NuxtLink>
      </div>
    </div>

    <div class="worksheet-preview worksheet-preview--compact" aria-hidden="true">
      <div class="worksheet-preview__header">
        <span>DailyOpsStudio</span>
        <strong>Weekly Business Review</strong>
      </div>
      <div class="worksheet-preview__rule"></div>
      <div class="worksheet-preview__summary"><span></span><span></span><span></span></div>
      <div class="worksheet-preview__columns">
        <div><b>Review</b><span></span><span></span><span></span></div>
        <div><b>Next week</b><span></span><span></span><span></span></div>
      </div>
    </div>
  </section>
</template>
