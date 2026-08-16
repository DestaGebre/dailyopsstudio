import type { MarketDecision, MarketScores } from '~/types/market-research'

const opportunityCriteria: (keyof MarketScores)[] = [
  'demand',
  'problemStrength',
  'commercialIntent',
  'differentiation',
  'reachability',
  'feasibility'
]

const riskCriteria: (keyof MarketScores)[] = ['startupCostRisk', 'competitionRisk', 'operationalRisk', 'complianceRisk']

export const calculateMarketScore = (scores: MarketScores): number => {
  const upside = opportunityCriteria.reduce((total, key) => total + scores[key], 0) / opportunityCriteria.length
  const risk = riskCriteria.reduce((total, key) => total + scores[key], 0) / riskCriteria.length
  return Math.round(Math.max(0, Math.min(10, upside * 0.75 + (10 - risk) * 0.25)) * 10) / 10
}

export const recommendDecision = (
  scores: MarketScores,
  evidenceCount: number,
  blockerCount: number
): MarketDecision | null => {
  const score = calculateMarketScore(scores)
  const severeRisk = riskCriteria.some((key) => scores[key] >= 9)

  if (evidenceCount === 0) return null
  if (severeRisk || score < 4) return 'REJECT'
  if (blockerCount > 0 || evidenceCount < 3 || score < 6.5) return 'VALIDATE'
  if (score >= 7.5 && evidenceCount >= 5) return 'GO'
  return 'HOLD'
}

export const explainDecision = (
  decision: MarketDecision | null,
  score: number,
  evidenceCount: number,
  blockerCount: number
): string => {
  if (!decision) return 'No decision yet: add source-backed evidence before evaluating this opportunity.'
  if (decision === 'REJECT') return `Rejected at ${score}/10 because the evidence indicates weak upside or a severe risk.`
  if (decision === 'VALIDATE')
    return `Validation is required at ${score}/10 with ${evidenceCount} evidence item(s) and ${blockerCount} blocker(s).`
  if (decision === 'GO') return `Ready to continue at ${score}/10 with ${evidenceCount} evidence item(s) and no unresolved gate.`
  return `Held at ${score}/10: evidence exists, but the case is not strong enough to proceed or weak enough to reject.`
}
