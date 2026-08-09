<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { contactEmail, contactEmailHref } = useSiteLinks()

usePageSeo({
  title: 'Privacy Policy',
  description: 'How DailyOpsStudio collects, uses, shares, and protects personal information.'
})
</script>

<template>
  <section class="site-section stack">
    <div class="section-heading stack">
      <p class="legal-page__eyebrow">Effective and last updated August 9, 2026</p>
      <h1>Privacy Policy</h1>
      <p>
        This policy explains how DailyOpsStudio handles personal information when you visit this website, contact us, or
        buy a DailyOpsStudio product through Etsy.
      </p>
    </div>

    <div class="card legal-page stack">
      <section class="stack">
        <h2>Who is responsible for your information</h2>
        <p>
          DailyOpsStudio is responsible for personal information it receives in connection with this website and its
          Etsy shop. Privacy questions and requests can be sent to
          <a v-if="contactEmail" :href="contactEmailHref">{{ contactEmail }}</a
          ><span v-else>DailyOpsStudio through the contact page</span>.
        </p>
      </section>

      <section class="stack">
        <h2>Information we receive</h2>
        <p>This website does not provide accounts, checkout, or comments. We may receive:</p>
        <ul>
          <li>If you email us, we receive your email address, message, and any information you choose to include.</li>
          <li>
            If you request a free resource, we and our email provider receive your email address, subscription status,
            consent choices, and technical information associated with the request.
          </li>
          <li>
            When you order through Etsy, Etsy may provide information needed to manage the transaction, such as your
            name, email address, order details, payment status, and messages. Etsy processes payment information; we do
            not receive your complete card or bank details.
          </li>
          <li>
            Our hosting provider may process technical request information such as IP address, browser details,
            requested pages, timestamps, and security events.
          </li>
        </ul>
      </section>

      <section class="stack">
        <h2>How and why we use information</h2>
        <ul>
          <li>To process and support Etsy orders and provide purchased digital products.</li>
          <li>To answer support, product, licensing, or privacy questions.</li>
          <li>To confirm your email address and deliver a free resource you requested.</li>
          <li>To send marketing emails only when you separately choose to receive them.</li>
          <li>To operate, secure, troubleshoot, and improve the website.</li>
          <li>To maintain business records and meet applicable legal obligations.</li>
        </ul>
        <p>We do not sell personal information or use information received by email for unrelated marketing.</p>
      </section>

      <section class="stack">
        <h2>Legal reasons for processing</h2>
        <p>
          Where data-protection law requires a legal basis, we process information as needed to perform our contract
          with you, comply with legal obligations, and pursue legitimate interests such as customer support, fraud
          prevention, website security, and improving our services. We rely on your request to deliver a free resource
          and on your separate consent for optional marketing emails. You may withdraw marketing consent at any time.
        </p>
      </section>

      <section class="stack">
        <h2>Service providers and external websites</h2>
        <p>
          We share information only as needed with service providers that help us operate the business, comply with the
          law, or protect our rights. The site is deployed through Cloudflare Pages, email forms and delivery are
          provided by MailerLite, and purchases take place on Etsy. These providers process information under their own
          privacy terms. Review the
          <a href="https://www.cloudflare.com/policies/privacy/" target="_blank" rel="noopener noreferrer"
            >Cloudflare Privacy Policy</a
          >
          and
          <a href="https://www.etsy.com/legal/privacy/" target="_blank" rel="noopener noreferrer"
            >Etsy Privacy Policy</a
          >
          and
          <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
            >MailerLite Privacy Policy</a
          >
          before using their services.
        </p>
      </section>

      <section class="stack">
        <h2>Cookies and local storage</h2>
        <p>
          DailyOpsStudio does not intentionally set advertising or analytics cookies. The embedded MailerLite form may
          use necessary technologies for form operation, security, and abuse prevention. External services may use
          additional cookies after you interact with them, subject to their own settings and policies.
        </p>
      </section>

      <section class="stack">
        <h2>Retention and security</h2>
        <p>
          We keep information only as long as reasonably needed to provide products and support, maintain necessary
          business and transaction records, resolve disputes, enforce agreements, or meet legal obligations. Retention
          periods vary according to the type of information and the reason it is held. Reasonable technical and
          organizational measures are used to protect information, although no internet service can guarantee absolute
          security.
        </p>
      </section>

      <section class="stack">
        <h2>International processing</h2>
        <p>
          Etsy, Cloudflare, and other providers may process information in countries other than the one where you live.
          Where required, those providers use recognized safeguards for international data transfers. Their privacy
          policies explain their practices in more detail.
        </p>
      </section>

      <section class="stack">
        <h2>Your choices and rights</h2>
        <p>
          Depending on where you live, you may have rights to ask what personal information we hold, request a
          correction or deletion, restrict or object to processing, or receive a portable copy. Contact us using the
          email above. We may need to verify your identity before completing a request. You may also have the right to
          complain to your local data-protection authority. For information controlled by Etsy, submit your request
          directly to Etsy.
        </p>
      </section>

      <section class="stack">
        <h2>Children's privacy</h2>
        <p>
          DailyOpsStudio products and this website are not directed to children under 13, and we do not knowingly
          collect personal information from children. If you believe a child has provided personal information, please
          contact us so we can take appropriate action.
        </p>
      </section>

      <section class="stack">
        <h2>Changes to this policy</h2>
        <p>We may update this page when the website, service providers, or applicable requirements change.</p>
      </section>
    </div>
  </section>
</template>
