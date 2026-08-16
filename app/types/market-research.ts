export type MarketDecision = 'GO' | 'VALIDATE' | 'HOLD' | 'REJECT'
export type EvidenceDirection = 'positive' | 'neutral' | 'negative'

export interface MarketEvidence {
  id: string
  claim: string
  source: string
  sourceUrl?: string
  direction: EvidenceDirection
  createdAt: string
}

export interface MarketResearchRecord {
  id: string
  question: string
  summary: string
  assumptions: string[]
  economics: string
  risks: string[]
  recommendedAction: string
  createdAt: string
}

export interface MarketDecisionRecord {
  id: string
  decision: MarketDecision
  score: number
  reason: string
  nextAction: string
  createdAt: string
}

export interface MarketSupplier {
  id: string
  name: string
  url?: string
  requirements: string
  notes: string
}

export interface MarketScores {
  demand: number
  problemStrength: number
  commercialIntent: number
  differentiation: number
  reachability: number
  feasibility: number
  startupCostRisk: number
  competitionRisk: number
  operationalRisk: number
  complianceRisk: number
}

export interface MarketOpportunity {
  id: string
  title: string
  businessModel: string
  targetCustomer: string
  researchQuestion: string
  notes: string
  blockers: string[]
  evidence: MarketEvidence[]
  suppliers: MarketSupplier[]
  research: MarketResearchRecord[]
  decisions: MarketDecisionRecord[]
  scores: MarketScores
  decision: MarketDecision | null
  decisionReason: string
  score: number
  nextAction: string
  successCriteria: string
  stopCriteria: string
  createdAt: string
  updatedAt: string
}

export const scoreLabels: Record<keyof MarketScores, string> = {
  demand: 'Demand',
  problemStrength: 'Problem strength',
  commercialIntent: 'Commercial intent',
  differentiation: 'Differentiation',
  reachability: 'Customer reachability',
  feasibility: 'Feasibility',
  startupCostRisk: 'Startup cost risk',
  competitionRisk: 'Competition risk',
  operationalRisk: 'Operational complexity',
  complianceRisk: 'Legal / compliance risk'
}

export const emptyScores = (): MarketScores => ({
  demand: 5,
  problemStrength: 5,
  commercialIntent: 5,
  differentiation: 5,
  reachability: 5,
  feasibility: 5,
  startupCostRisk: 5,
  competitionRisk: 5,
  operationalRisk: 5,
  complianceRisk: 5
})
