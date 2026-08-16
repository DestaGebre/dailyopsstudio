import {
  emptyScores,
  type MarketEvidence,
  type MarketOpportunity,
  type MarketResearchRecord,
  type MarketScores,
  type MarketSupplier
} from '~/types/market-research'
import { calculateMarketScore, explainDecision, recommendDecision } from '~/utils/market-scoring'

const LEGACY_KEY = 'dailyops-market-research-v1'
const opportunities = ref<MarketOpportunity[]>([])
const loaded = ref(false)
const storeError = ref('')
const identifier = () => crypto.randomUUID()

const refreshDecision = (item: MarketOpportunity) => {
  item.score = calculateMarketScore(item.scores)
  item.decision = recommendDecision(item.scores, item.evidence.length, item.blockers.length)
  item.decisionReason = explainDecision(item.decision, item.score, item.evidence.length, item.blockers.length)
  item.updatedAt = new Date().toISOString()
}

export const useMarketResearch = () => {
  const client = useSupabase()
  const { user, initialize } = useAuth()
  const requireUser = async () => {
    await initialize()
    if (!client || !user.value) throw new Error('Sign in and configure Supabase to use Market Research.')
    return user.value
  }

  const load = async () => {
    if (!import.meta.client || loaded.value) return
    try {
      await requireUser()
      const { data: rows, error } = await client!
        .from('market_opportunities')
        .select('*')
        .order('updated_at', { ascending: false })
      if (error) throw error
      const ids = (rows ?? []).map((row) => row.id)
      const evidenceResponse = ids.length
        ? await client!.from('market_evidence').select('*').in('opportunity_id', ids)
        : { data: [], error: null }
      const supplierResponse = ids.length
        ? await client!.from('market_suppliers').select('*').in('opportunity_id', ids)
        : { data: [], error: null }
      const researchResponse = ids.length
        ? await client!.from('market_research_records').select('*').in('opportunity_id', ids).order('created_at', { ascending: false })
        : { data: [], error: null }
      const decisionResponse = ids.length
        ? await client!.from('market_decision_records').select('*').in('opportunity_id', ids).order('created_at', { ascending: false })
        : { data: [], error: null }
      if (evidenceResponse.error) throw evidenceResponse.error
      if (supplierResponse.error) throw supplierResponse.error
      if (researchResponse.error) throw researchResponse.error
      if (decisionResponse.error) throw decisionResponse.error
      opportunities.value = (rows ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        businessModel: row.business_model,
        targetCustomer: row.target_customer,
        researchQuestion: row.research_question,
        notes: row.notes,
        blockers: row.blockers as string[],
        evidence: (evidenceResponse.data ?? [])
          .filter((entry) => entry.opportunity_id === row.id)
          .map((entry) => ({
            id: entry.id,
            claim: entry.claim,
            source: entry.source,
            sourceUrl: entry.source_url ?? undefined,
            direction: entry.direction as MarketEvidence['direction'],
            createdAt: entry.created_at
          })),
        suppliers: (supplierResponse.data ?? [])
          .filter((entry) => entry.opportunity_id === row.id)
          .map((entry) => ({
            id: entry.id,
            name: entry.name,
            url: entry.url ?? undefined,
            requirements: entry.requirements,
            notes: entry.notes
          })),
        research: (researchResponse.data ?? []).filter((entry) => entry.opportunity_id === row.id).map((entry) => ({
          id: entry.id, question: entry.question, summary: entry.summary,
          assumptions: entry.assumptions as string[], economics: entry.economics,
          risks: entry.risks as string[], recommendedAction: entry.recommended_action, createdAt: entry.created_at
        })),
        decisions: (decisionResponse.data ?? []).filter((entry) => entry.opportunity_id === row.id).map((entry) => ({
          id: entry.id, decision: entry.decision as NonNullable<MarketOpportunity['decision']>, score: entry.score,
          reason: entry.reason, nextAction: entry.next_action, createdAt: entry.created_at
        })),
        scores: row.scores as unknown as MarketScores,
        decision: row.decision as MarketOpportunity['decision'],
        decisionReason: row.decision_reason,
        score: row.score,
        nextAction: row.next_action,
        successCriteria: row.success_criteria,
        stopCriteria: row.stop_criteria,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }))
    } catch (error) {
      storeError.value = error instanceof Error ? error.message : 'Market Research could not be loaded.'
    } finally {
      loaded.value = true
    }
  }

  const save = async (item: MarketOpportunity) => {
    const currentUser = await requireUser()
    refreshDecision(item)
    const { error } = await client!.from('market_opportunities').upsert({
      id: item.id,
      user_id: currentUser.id,
      title: item.title,
      business_model: item.businessModel,
      target_customer: item.targetCustomer,
      research_question: item.researchQuestion,
      notes: item.notes,
      blockers: item.blockers,
      scores: item.scores as unknown as import('~/types/database').Json,
      decision: item.decision,
      decision_reason: item.decisionReason,
      score: item.score,
      next_action: item.nextAction,
      success_criteria: item.successCriteria,
      stop_criteria: item.stopCriteria,
      created_at: item.createdAt,
      updated_at: item.updatedAt
    })
    if (error) throw error
  }

  const createOpportunity = async (
    input: Pick<MarketOpportunity, 'title' | 'businessModel' | 'targetCustomer' | 'researchQuestion'>
  ) => {
    const now = new Date().toISOString()
    const item: MarketOpportunity = {
      id: identifier(),
      ...input,
      notes: '',
      blockers: [],
      evidence: [],
      suppliers: [],
      research: [],
      decisions: [],
      scores: emptyScores(),
      decision: null,
      decisionReason: 'No decision yet: add source-backed evidence before evaluating this opportunity.',
      score: 5,
      nextAction: 'Add three pieces of decision-relevant evidence.',
      successCriteria: '',
      stopCriteria: '',
      createdAt: now,
      updatedAt: now
    }
    await save(item)
    opportunities.value.unshift(item)
    return item
  }

  const addResearch = async (opportunity: MarketOpportunity, input: Omit<MarketResearchRecord, 'id' | 'createdAt'>) => {
    const currentUser = await requireUser()
    const item = { ...input, id: identifier(), createdAt: new Date().toISOString() }
    const { error } = await client!.from('market_research_records').insert({
      id: item.id, opportunity_id: opportunity.id, user_id: currentUser.id, question: item.question,
      summary: item.summary, assumptions: item.assumptions, economics: item.economics, risks: item.risks,
      recommended_action: item.recommendedAction, created_at: item.createdAt
    })
    if (error) throw error
    opportunity.research.unshift(item)
    if (item.recommendedAction) opportunity.nextAction = item.recommendedAction
    await save(opportunity)
  }

  const recordDecision = async (opportunity: MarketOpportunity) => {
    await save(opportunity)
    if (!opportunity.decision) throw new Error('Add supporting evidence before recording a decision.')
    if (!opportunity.nextAction.trim()) throw new Error('Add a next action before recording a decision.')
    const currentUser = await requireUser()
    const previous = opportunity.decisions[0]
    if (previous && previous.decision === opportunity.decision && previous.score === opportunity.score &&
      previous.reason === opportunity.decisionReason && previous.nextAction === opportunity.nextAction) return false
    const item = { id: identifier(), decision: opportunity.decision, score: opportunity.score,
      reason: opportunity.decisionReason, nextAction: opportunity.nextAction, createdAt: new Date().toISOString() }
    const { error } = await client!.from('market_decision_records').insert({
      id: item.id, opportunity_id: opportunity.id, user_id: currentUser.id, decision: item.decision,
      score: item.score, reason: item.reason, next_action: item.nextAction, created_at: item.createdAt
    })
    if (error) throw error
    opportunity.decisions.unshift(item)
    return true
  }

  const addEvidence = async (opportunity: MarketOpportunity, input: Omit<MarketEvidence, 'id' | 'createdAt'>) => {
    const currentUser = await requireUser()
    const item = { ...input, id: identifier(), createdAt: new Date().toISOString() }
    const { error } = await client!.from('market_evidence').insert({
      id: item.id,
      opportunity_id: opportunity.id,
      user_id: currentUser.id,
      claim: item.claim,
      source: item.source,
      source_url: item.sourceUrl ?? null,
      direction: item.direction,
      created_at: item.createdAt
    })
    if (error) throw error
    opportunity.evidence.push(item)
    await save(opportunity)
  }

  const addSupplier = async (opportunity: MarketOpportunity, input: Omit<MarketSupplier, 'id'>) => {
    const currentUser = await requireUser()
    const item = { ...input, id: identifier() }
    const { error } = await client!.from('market_suppliers').insert({
      id: item.id,
      opportunity_id: opportunity.id,
      user_id: currentUser.id,
      name: item.name,
      url: item.url ?? null,
      requirements: item.requirements,
      notes: item.notes
    })
    if (error) throw error
    opportunity.suppliers.push(item)
    await save(opportunity)
  }

  const legacyCount = computed(() => {
    if (!import.meta.client) return 0
    try {
      return (JSON.parse(localStorage.getItem(LEGACY_KEY) ?? '[]') as unknown[]).length
    } catch {
      return 0
    }
  })

  const importLegacy = async () => {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) ?? '[]') as MarketOpportunity[]
    for (const old of legacy) {
      const copy = { ...old, id: identifier(), evidence: [], suppliers: [], updatedAt: new Date().toISOString() }
      copy.research = old.research ?? []
      copy.decisions = old.decisions ?? []
      copy.decisionReason = old.decisionReason ?? ''
      await save(copy)
      for (const entry of old.evidence ?? [])
        await addEvidence(copy, {
          claim: entry.claim,
          source: entry.source,
          sourceUrl: entry.sourceUrl,
          direction: entry.direction
        })
      for (const entry of old.suppliers ?? [])
        await addSupplier(copy, {
          name: entry.name,
          url: entry.url,
          requirements: entry.requirements,
          notes: entry.notes
        })
      opportunities.value.unshift(copy)
    }
    localStorage.removeItem(LEGACY_KEY)
    return legacy.length
  }

  return {
    opportunities,
    loaded,
    error: readonly(storeError),
    legacyCount,
    load,
    createOpportunity,
    save,
    addEvidence,
    addSupplier,
    addResearch,
    recordDecision,
    importLegacy
  }
}
