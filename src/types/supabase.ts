export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          company: string | null
          created_at: string
          updated_at: string
          role: string
          is_verified: boolean
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
          role?: string
          is_verified?: boolean
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
          role?: string
          is_verified?: boolean
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}