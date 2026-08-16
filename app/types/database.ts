export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; display_name: string | null; created_at: string; updated_at: string }
        Insert: { id: string; display_name?: string | null }
        Update: { display_name?: string | null }
        Relationships: []
      }
      market_opportunities: {
        Row: {
          id: string
          user_id: string
          title: string
          business_model: string
          target_customer: string
          research_question: string
          notes: string
          blockers: Json
          scores: Json
          decision: string | null
          decision_reason: string
          score: number
          next_action: string
          success_criteria: string
          stop_criteria: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['market_opportunities']['Row']> & {
          user_id: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['market_opportunities']['Row']>
        Relationships: []
      }
      market_research_records: {
        Row: { id: string; opportunity_id: string; user_id: string; question: string; summary: string; assumptions: Json; economics: string; risks: Json; recommended_action: string; created_at: string }
        Insert: Omit<Database['public']['Tables']['market_research_records']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['market_research_records']['Row']>
        Relationships: []
      }
      market_decision_records: {
        Row: { id: string; opportunity_id: string; user_id: string; decision: string; score: number; reason: string; next_action: string; created_at: string }
        Insert: Omit<Database['public']['Tables']['market_decision_records']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['market_decision_records']['Row']>
        Relationships: []
      }
      market_evidence: {
        Row: {
          id: string
          opportunity_id: string
          user_id: string
          claim: string
          source: string
          source_url: string | null
          direction: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['market_evidence']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['market_evidence']['Row']>
        Relationships: []
      }
      market_suppliers: {
        Row: {
          id: string
          opportunity_id: string
          user_id: string
          name: string
          url: string | null
          requirements: string
          notes: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['market_suppliers']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['market_suppliers']['Row']>
        Relationships: []
      }
      background_tasks: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string | null
          task_type: string
          status: string
          payload: Json
          result: Json | null
          error: string | null
          attempts: number
          created_at: string
          started_at: string | null
          completed_at: string | null
        }
        Insert: { user_id: string; opportunity_id?: string | null; task_type: string; payload?: Json; status?: string }
        Update: Partial<Database['public']['Tables']['background_tasks']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
