<script setup lang="ts">
import { scoreLabels, type EvidenceDirection, type MarketOpportunity } from '~/types/market-research'

const {
  opportunities,
  loaded,
  error,
  legacyCount,
  load,
  createOpportunity,
  save,
  addEvidence,
  addSupplier,
  addResearch,
  recordDecision,
  importLegacy
} = useMarketResearch()
const { queueResearchBrief } = useBackgroundTasks()
const selectedId = ref('')
const showCreate = ref(false)
const notice = ref('')
const newOpportunity = reactive({ title: '', businessModel: '', targetCustomer: '', researchQuestion: '' })
const evidence = reactive({ claim: '', source: '', sourceUrl: '', direction: 'positive' as EvidenceDirection })
const supplier = reactive({ name: '', url: '', requirements: '', notes: '' })
const blockerDraft = ref('')
const researchDraft = reactive({ summary: '', assumptions: '', economics: '', risks: '', recommendedAction: '' })

const selected = computed(() => opportunities.value.find((item) => item.id === selectedId.value))
const positiveKeys = [
  'demand',
  'problemStrength',
  'commercialIntent',
  'differentiation',
  'reachability',
  'feasibility'
] as const
const riskKeys = ['startupCostRisk', 'competitionRisk', 'operationalRisk', 'complianceRisk'] as const

onMounted(async () => {
  await load()
  selectedId.value ||= opportunities.value[0]?.id ?? ''
  showCreate.value = opportunities.value.length === 0
})

const announce = (message: string) => {
  notice.value = message
  window.setTimeout(() => (notice.value = ''), 2500)
}

const submitOpportunity = async () => {
  const created = await createOpportunity(newOpportunity)
  selectedId.value = created.id
  Object.assign(newOpportunity, { title: '', businessModel: '', targetCustomer: '', researchQuestion: '' })
  showCreate.value = false
  announce('Opportunity created and saved to your account.')
}

const saveSelected = async () => {
  if (!selected.value) return
  await save(selected.value)
  announce(`Saved. Recommendation: ${selected.value.decision}.`)
}

const submitEvidence = async () => {
  if (!selected.value) return
  await addEvidence(selected.value, evidence)
  Object.assign(evidence, { claim: '', source: '', sourceUrl: '', direction: 'positive' })
  announce('Evidence added and recommendation updated.')
}

const submitSupplier = async () => {
  if (!selected.value) return
  await addSupplier(selected.value, supplier)
  Object.assign(supplier, { name: '', url: '', requirements: '', notes: '' })
  announce('Supplier or platform added.')
}

const addBlocker = async () => {
  if (!selected.value || !blockerDraft.value.trim()) return
  selected.value.blockers.push(blockerDraft.value.trim())
  blockerDraft.value = ''
  await saveSelected()
}

const removeBlocker = async (index: number) => {
  if (!selected.value) return
  selected.value.blockers.splice(index, 1)
  await saveSelected()
}

const migrateLegacy = async () => {
  const count = await importLegacy()
  announce(`${count} browser-stored ${count === 1 ? 'investigation' : 'investigations'} imported.`)
}

const queueBrief = async () => {
  if (!selected.value) return
  await queueResearchBrief(selected.value.id, selected.value.title, selected.value.researchQuestion)
  announce('Research brief queued. Track it under Background Tasks.')
}

const lines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean)
const submitResearch = async () => {
  if (!selected.value) return
  await addResearch(selected.value, {
    question: selected.value.researchQuestion,
    summary: researchDraft.summary,
    assumptions: lines(researchDraft.assumptions),
    economics: researchDraft.economics,
    risks: lines(researchDraft.risks),
    recommendedAction: researchDraft.recommendedAction
  })
  Object.assign(researchDraft, { summary: '', assumptions: '', economics: '', risks: '', recommendedAction: '' })
  announce('Research snapshot preserved.')
}

const commitDecision = async () => {
  if (!selected.value) return
  const created = await recordDecision(selected.value)
  announce(created ? 'Decision recorded in history.' : 'Decision is unchanged; history was not duplicated.')
}

const selectOpportunity = (item: MarketOpportunity) => {
  selectedId.value = item.id
  showCreate.value = false
}
</script>

<template>
  <div class="research-workspace stack">
    <p class="research-flow" aria-label="Research workflow">
      Discover <span>→</span> Research <span>→</span> Evidence <span>→</span> Score <span>→</span> Decide <span>→</span> Measure
    </p>
    <p class="sr-only" aria-live="polite">{{ notice }}</p>
    <p v-if="error" class="auth-message auth-message--error" role="alert">{{ error }}</p>
    <div v-if="legacyCount" class="research-storage-note">
      <p>
        {{ legacyCount }} investigation{{ legacyCount === 1 ? '' : 's' }} from the earlier browser-only version can be
        imported into your account.
      </p>
      <button class="button button--secondary" type="button" @click="migrateLegacy">Import now</button>
    </div>

    <section class="research-overview stack" aria-labelledby="opportunities-title">
      <div class="research-section-header">
        <div>
          <h2 id="opportunities-title">Opportunities</h2>
          <p class="text-muted">Compare active investigations and open one decision workspace.</p>
        </div>
        <button class="button button--primary" type="button" @click="showCreate = !showCreate">
          Create opportunity
        </button>
      </div>

      <form v-if="showCreate" class="research-panel research-form" @submit.prevent="submitOpportunity">
        <h3>New investigation</h3>
        <label>Opportunity name<input v-model.trim="newOpportunity.title" required /></label>
        <label
          >Business model<input
            v-model.trim="newOpportunity.businessModel"
            required
            placeholder="Digital product, physical product, service, software…"
        /></label>
        <label>Target customer<input v-model.trim="newOpportunity.targetCustomer" required /></label>
        <label class="research-field--wide"
          >Research question<textarea
            v-model.trim="newOpportunity.researchQuestion"
            required
            rows="3"
            placeholder="What must be true for this to become a viable business?"
          />
        </label>
        <div class="research-field--wide">
          <button class="button button--primary" type="submit">Start investigation</button>
        </div>
      </form>

      <p v-if="loaded && !opportunities.length && !showCreate" class="research-empty">
        No opportunities yet. Create one to begin with a falsifiable question.
      </p>
      <div v-else-if="opportunities.length" class="research-table-wrap" tabindex="0">
        <table class="research-table">
          <caption class="sr-only">
            Market opportunity comparison
          </caption>
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Model</th>
              <th>Evidence</th>
              <th>Score</th>
              <th>Decision</th>
              <th>Next action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in opportunities" :key="item.id" :class="{ 'is-selected': item.id === selectedId }">
              <td>
                <button class="research-link-button" type="button" @click="selectOpportunity(item)">
                  {{ item.title }}
                </button>
              </td>
              <td>{{ item.businessModel }}</td>
              <td>{{ item.evidence.length }}</td>
              <td>{{ item.evidence.length ? `${item.score}/10` : 'Not scored' }}</td>
              <td>
                <span class="decision-badge" :data-decision="item.decision || 'PENDING'">{{ item.decision || 'PENDING' }}</span>
              </td>
              <td>{{ item.nextAction }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <template v-if="selected">
      <section class="research-panel stack" aria-labelledby="brief-title">
        <div class="research-section-header">
          <div>
            <p class="resource-eyebrow">Opportunity</p>
            <h2 id="brief-title">{{ selected.title }}</h2>
          </div>
          <span class="decision-badge decision-badge--large" :data-decision="selected.decision || 'PENDING'"
            >{{ selected.decision || 'PENDING' }} · {{ selected.evidence.length ? `${selected.score}/10` : 'awaiting evidence' }}</span
          >
        </div>
        <div class="research-form">
          <label>Business model<input v-model="selected.businessModel" /></label>
          <label>Target customer<input v-model="selected.targetCustomer" /></label>
          <label class="research-field--wide"
            >Research question<textarea v-model="selected.researchQuestion" rows="2" />
          </label>
          <label class="research-field--wide"
            >Research notes<textarea
              v-model="selected.notes"
              rows="4"
              placeholder="Keep assumptions, economics, competition and operational findings here."
            />
          </label>
        </div>
        <button class="button button--secondary research-save" type="button" @click="saveSelected">Save brief</button>
      </section>

      <section class="research-panel stack" aria-labelledby="research-title">
        <div class="research-section-header">
          <div><p class="resource-eyebrow">Structured research</p><h2 id="research-title">Research snapshots</h2></div>
          <button class="button button--secondary" type="button" @click="queueBrief">Queue research brief</button>
        </div>
        <p class="text-muted">Preserve each research pass. Keep assumptions separate from sourced evidence and end with a decision-relevant action.</p>
        <form class="research-form" @submit.prevent="submitResearch">
          <label class="research-field--wide">Findings summary<textarea v-model.trim="researchDraft.summary" required rows="3" /></label>
          <label>Assumptions, one per line<textarea v-model="researchDraft.assumptions" rows="4" /></label>
          <label>Risks, one per line<textarea v-model="researchDraft.risks" rows="4" /></label>
          <label class="research-field--wide">Economics<textarea v-model.trim="researchDraft.economics" rows="3" placeholder="Price, costs, margin, acquisition cost, recurring revenue…" /></label>
          <label class="research-field--wide">Recommended next action<input v-model.trim="researchDraft.recommendedAction" required /></label>
          <button class="button button--primary" type="submit">Save research snapshot</button>
        </form>
        <ol v-if="selected.research.length" class="research-history">
          <li v-for="record in selected.research" :key="record.id">
            <small>{{ new Date(record.createdAt).toLocaleString() }}</small><strong>{{ record.summary }}</strong>
            <p><b>Economics:</b> {{ record.economics || 'Not established' }}</p>
            <p><b>Assumptions:</b> {{ record.assumptions.join('; ') || 'None recorded' }}</p>
            <p><b>Risks:</b> {{ record.risks.join('; ') || 'None recorded' }}</p>
          </li>
        </ol>
      </section>

      <section class="research-split">
        <div class="research-panel stack">
          <h2>Evidence</h2>
          <p class="text-muted">
            Capture the claim and its source. A URL is optional, but source-backed evidence should guide scoring.
          </p>
          <form class="research-form" @submit.prevent="submitEvidence">
            <label class="research-field--wide"
              >Claim or finding<textarea v-model.trim="evidence.claim" required rows="2" />
            </label>
            <label
              >Source<input
                v-model.trim="evidence.source"
                required
                placeholder="Interview, marketplace, supplier quote…"
            /></label>
            <label
              >Direction<select v-model="evidence.direction">
                <option value="positive">Supports</option>
                <option value="neutral">Neutral / unknown</option>
                <option value="negative">Contradicts</option>
              </select></label
            >
            <label class="research-field--wide"
              >Source URL<input v-model.trim="evidence.sourceUrl" type="url" placeholder="https://"
            /></label>
            <button class="button button--primary" type="submit">Add evidence</button>
          </form>
          <ul v-if="selected.evidence.length" class="research-record-list">
            <li v-for="item in selected.evidence" :key="item.id">
              <span class="evidence-direction" :data-direction="item.direction">{{ item.direction }}</span>
              <div>
                <strong>{{ item.claim }}</strong
                ><small
                  ><a v-if="item.sourceUrl" :href="item.sourceUrl" target="_blank" rel="noopener noreferrer">{{
                    item.source
                  }}</a
                  ><template v-else>{{ item.source }}</template></small
                >
              </div>
            </li>
          </ul>
          <p v-else class="research-empty">
            No evidence captured. Start with customer behavior, real prices, costs, or restrictions.
          </p>
        </div>

        <div class="research-panel stack">
          <h2>Suppliers & platforms</h2>
          <p class="text-muted">Optional for any model: record vendors, marketplaces, tools, and access constraints.</p>
          <form class="research-form" @submit.prevent="submitSupplier">
            <label>Name<input v-model.trim="supplier.name" required /></label>
            <label>URL<input v-model.trim="supplier.url" type="url" placeholder="https://" /></label>
            <label class="research-field--wide"
              >Requirements<textarea
                v-model.trim="supplier.requirements"
                rows="2"
                placeholder="P.IVA, minimum order, geography, fees…"
              />
            </label>
            <label class="research-field--wide">Notes<textarea v-model.trim="supplier.notes" rows="2" /></label>
            <button class="button button--primary" type="submit">Add supplier</button>
          </form>
          <ul v-if="selected.suppliers.length" class="research-record-list">
            <li v-for="item in selected.suppliers" :key="item.id">
              <div>
                <strong
                  ><a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}</a
                  ><template v-else>{{ item.name }}</template></strong
                ><small>{{ item.requirements || 'No requirements recorded' }}</small
                ><small>{{ item.notes }}</small>
              </div>
            </li>
          </ul>
          <p v-else class="research-empty">No suppliers or platforms recorded.</p>
        </div>
      </section>

      <section class="research-panel stack" aria-labelledby="score-title">
        <div>
          <p class="resource-eyebrow">Explicit criteria</p>
          <h2 id="score-title">Score the opportunity</h2>
          <p class="text-muted">
            0 is weak and 10 is strong for opportunity criteria. For risks, 10 is severe. Unsupported estimates should
            stay conservative.
          </p>
        </div>
        <div class="research-score-grid">
          <fieldset>
            <legend>Opportunity strength</legend>
            <label v-for="key in positiveKeys" :key="key" class="score-row"
              ><span
                >{{ scoreLabels[key] }} <output>{{ selected.scores[key] }}</output></span
              ><input
                v-model.number="selected.scores[key]"
                type="range"
                min="0"
                max="10"
                step="1"
                @change="saveSelected"
            /></label>
          </fieldset>
          <fieldset>
            <legend>Risk penalties</legend>
            <label v-for="key in riskKeys" :key="key" class="score-row"
              ><span
                >{{ scoreLabels[key] }} <output>{{ selected.scores[key] }}</output></span
              ><input
                v-model.number="selected.scores[key]"
                type="range"
                min="0"
                max="10"
                step="1"
                @change="saveSelected"
            /></label>
          </fieldset>
        </div>
      </section>

      <section class="research-split">
        <div class="research-panel stack">
          <h2>Blockers</h2>
          <p class="text-muted">Record any constraint that could prevent launch or invalidate the economics.</p>
          <form class="research-inline-form" @submit.prevent="addBlocker">
            <label class="sr-only" for="blocker">New blocker</label
            ><input
              id="blocker"
              v-model="blockerDraft"
              placeholder="P.IVA, margin, shipping, legal constraint…"
            /><button class="button button--secondary" type="submit">Add</button>
          </form>
          <ul v-if="selected.blockers.length" class="research-blockers">
            <li v-for="(blocker, index) in selected.blockers" :key="`${blocker}-${index}`">
              {{ blocker }}
              <button type="button" aria-label="Remove blocker" @click="removeBlocker(index)">×</button>
            </li>
          </ul>
          <p v-else class="research-empty">No blockers recorded.</p>
        </div>
        <div class="research-panel stack">
          <div>
            <p class="resource-eyebrow">Decision contract</p>
            <h2>Next validation action</h2>
          </div>
          <p>
            Current recommendation: <strong>{{ selected.decision || 'PENDING' }}</strong>. {{ selected.decisionReason }}
          </p>
          <label>Next action<textarea v-model="selected.nextAction" rows="3" required /></label
          ><label
            >Success criteria<textarea
              v-model="selected.successCriteria"
              rows="2"
              placeholder="What result permits progress?"
            /></label
          ><label
            >Stop criteria<textarea
              v-model="selected.stopCriteria"
              rows="2"
              placeholder="What result ends this investigation?"
            />
          </label>
          <div class="home-hero__actions">
            <button class="button button--primary research-save" type="button" :disabled="!selected.decision" @click="commitDecision">
              Record decision & next action
            </button>
          </div>
          <p v-if="!selected.decision" class="research-empty">A decision cannot be recorded until at least one source-backed evidence item exists.</p>
          <ol v-if="selected.decisions.length" class="research-history">
            <li v-for="record in selected.decisions" :key="record.id">
              <small>{{ new Date(record.createdAt).toLocaleString() }}</small>
              <strong><span class="decision-badge" :data-decision="record.decision">{{ record.decision }}</span> {{ record.score }}/10</strong>
              <p>{{ record.reason }}</p><p><b>Next:</b> {{ record.nextAction }}</p>
            </li>
          </ol>
        </div>
      </section>
    </template>
  </div>
</template>
