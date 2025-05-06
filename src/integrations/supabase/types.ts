export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          password: string
          username: string
        }
        Insert: {
          password: string
          username: string
        }
        Update: {
          password?: string
          username?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          file_path: string
          id: string
          name: string
          size: number
          type: string
        }
        Insert: {
          created_at?: string
          file_path: string
          id?: string
          name: string
          size: number
          type: string
        }
        Update: {
          created_at?: string
          file_path?: string
          id?: string
          name?: string
          size?: number
          type?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          created_at: string | null
          creator_bio: string | null
          creator_image: string | null
          creator_name: string | null
          creator_title: string | null
          id: string
          mission: string | null
          page_name: string
          story: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          creator_bio?: string | null
          creator_image?: string | null
          creator_name?: string | null
          creator_title?: string | null
          id?: string
          mission?: string | null
          page_name: string
          story?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          creator_bio?: string | null
          creator_image?: string | null
          creator_name?: string | null
          creator_title?: string | null
          id?: string
          mission?: string | null
          page_name?: string
          story?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      required_documents: {
        Row: {
          document_name: string
          id: number
          university_id: string | null
        }
        Insert: {
          document_name: string
          id?: number
          university_id?: string | null
        }
        Update: {
          document_name?: string
          id?: number
          university_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "required_documents_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      semester_availability: {
        Row: {
          id: number
          semester: string
          university_id: string | null
        }
        Insert: {
          id?: number
          semester: string
          university_id?: string | null
        }
        Update: {
          id?: number
          semester?: string
          university_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "semester_availability_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      Studienkollegs: {
        Row: {
          created_at: string
          id: number
          Name_STK: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          Name_STK?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          Name_STK?: string | null
        }
        Relationships: []
      }
      test_requirements: {
        Row: {
          id: number
          test_name: string
          university_id: string | null
        }
        Insert: {
          id?: number
          test_name: string
          university_id?: string | null
        }
        Update: {
          id?: number
          test_name?: string
          university_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_requirements_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          location: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id: string
          image_url: string
          location: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      university_details: {
        Row: {
          address: string | null
          application_deadline: string | null
          application_method: string | null
          application_test_date: string | null
          bundesland: string | null
          email: string | null
          kurse: string | null
          language_requirements: string | null
          status: string | null
          university_id: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          application_deadline?: string | null
          application_method?: string | null
          application_test_date?: string | null
          bundesland?: string | null
          email?: string | null
          kurse?: string | null
          language_requirements?: string | null
          status?: string | null
          university_id: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          application_deadline?: string | null
          application_method?: string | null
          application_test_date?: string | null
          bundesland?: string | null
          email?: string | null
          kurse?: string | null
          language_requirements?: string | null
          status?: string | null
          university_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "university_details_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: true
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
