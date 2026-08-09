<script setup lang="ts">
usePageSeo({
  title: 'Free Restaurant Weekly Operations Review',
  description:
    'A free printable and fillable worksheet for restaurant owners and managers to review unfinished work, check operations, and set priorities for the next week.'
})

useHead({
  script: [
    {
      key: 'mailerlite-universal',
      innerHTML:
        "(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account','2564950');"
    }
  ]
})
</script>

<template>
  <section class="site-section resource-hero" aria-labelledby="resource-title">
    <div class="resource-hero__content stack">
      <p class="resource-eyebrow">Free printable and fillable worksheet</p>
      <h1 id="resource-title">Restaurant Weekly Operations Review</h1>
      <p class="resource-hero__lead">
        A calm, structured weekly reset for restaurant owners and managers who need to close open loops and decide what
        matters next.
      </p>
      <div class="resource-meta" aria-label="Worksheet details">
        <span>Printable + fillable PDF</span>
        <span>Restaurant operations</span>
        <span>Weekly use</span>
      </div>
      <div class="home-hero__actions">
        <a class="button button--primary" href="#get-worksheet">Get the free worksheet</a>
        <NuxtLink class="button button--secondary" to="/blog/a-weekly-operations-review-for-small-businesses">
          Read the review guide
        </NuxtLink>
      </div>
      <p class="resource-notice">Includes printable and editable versions in both A4 and US Letter sizes.</p>
    </div>

    <div class="worksheet-preview" role="img" aria-label="Stylized preview of the Weekly Business Review Worksheet">
      <div class="worksheet-preview__header">
        <span>DailyOpsStudio</span>
        <strong>Weekly Business Review</strong>
        <small>Week ending __________________</small>
      </div>
      <div class="worksheet-preview__section">
        <b>1. Look back</b>
        <span>Wins and progress</span><i></i><i></i> <span>Unfinished tasks</span><i></i><i></i>
      </div>
      <div class="worksheet-preview__columns">
        <div><b>2. Operations check</b><span>Customers</span><span>Finances</span><span>Workload</span></div>
        <div><b>3. Next week</b><span>Priority 1</span><span>Priority 2</span><span>Priority 3</span></div>
      </div>
    </div>
  </section>

  <section id="get-worksheet" class="site-section signup-section" aria-labelledby="signup-title">
    <div class="card signup-card stack">
      <div class="stack">
        <p class="resource-eyebrow">Free download</p>
        <h2 id="signup-title">Send the worksheet to your inbox</h2>
        <p>
          Enter your email address to receive all printable and fillable formats. Product news and practical tips are
          optional and require separate consent in the form.
        </p>
      </div>
      <div class="mailerlite-form" aria-label="Weekly Operations Review email form">
        <div class="ml-embedded" data-form="YcFecu"></div>
        <noscript>
          <p>JavaScript is required for this form. Please use the contact page to request the worksheet.</p>
        </noscript>
      </div>
      <p class="resource-notice">
        By submitting, you agree that MailerLite may process your information to deliver the worksheet. See our
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
      </p>
    </div>
  </section>

  <section class="site-section" aria-labelledby="worksheet-includes-title">
    <div class="section-heading stack">
      <p class="resource-eyebrow">One focused review</p>
      <h2 id="worksheet-includes-title">Move from a busy week to a clear plan</h2>
      <p>
        The worksheet guides you through reflection, operational checks, and next-week planning without turning your
        review into another complicated system.
      </p>
    </div>
    <div class="site-grid site-grid--3">
      <article class="card stack">
        <span class="resource-card__number" aria-hidden="true">01</span>
        <h3>Close open loops</h3>
        <p class="text-muted">
          Capture unfinished work, decisions, and follow-ups before they disappear into a new week.
        </p>
      </article>
      <article class="card stack">
        <span class="resource-card__number" aria-hidden="true">02</span>
        <h3>Check the business</h3>
        <p class="text-muted">Pause across customers, money, delivery, workload, and recurring operational issues.</p>
      </article>
      <article class="card stack">
        <span class="resource-card__number" aria-hidden="true">03</span>
        <h3>Choose priorities</h3>
        <p class="text-muted">Turn observations into three realistic priorities and a short list of next actions.</p>
      </article>
    </div>
  </section>

  <section class="site-section cta-section" aria-labelledby="resource-cta-title">
    <div class="card card--cta stack">
      <p class="resource-eyebrow">Build a consistent rhythm</p>
      <h2 id="resource-cta-title">Make the review part of every week</h2>
      <p class="text-muted">
        Set aside a regular time, complete the worksheet, and keep previous reviews so recurring issues become easier to
        spot.
      </p>
      <div class="home-hero__actions cta-section__actions">
        <a class="button button--primary" href="#get-worksheet">Get the free worksheet</a>
      </div>
    </div>
  </section>
</template>
