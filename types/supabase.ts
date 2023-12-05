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
      actions: {
        Row: {
          action_abbreviation: string | null
          action_description: string | null
          action_id: number
          action_inactive: boolean | null
          action_name: string | null
          created_at: string | null
        }
        Insert: {
          action_abbreviation?: string | null
          action_description?: string | null
          action_id?: number
          action_inactive?: boolean | null
          action_name?: string | null
          created_at?: string | null
        }
        Update: {
          action_abbreviation?: string | null
          action_description?: string | null
          action_id?: number
          action_inactive?: boolean | null
          action_name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      allocate_hours: {
        Row: {
          completed: boolean
          created_at: string
          hours: number | null
          id: number
          job_id: number | null
          job_task_id: number
          month: number
          rate: number | null
          task_id: number | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          completed?: boolean
          created_at?: string
          hours?: number | null
          id?: number
          job_id?: number | null
          job_task_id: number
          month: number
          rate?: number | null
          task_id?: number | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          hours?: number | null
          id?: number
          job_id?: number | null
          job_task_id?: number
          month?: number
          rate?: number | null
          task_id?: number | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      allocate_hours_2: {
        Row: {
          created_at: string
          hours: number | null
          id: number
          job_id: number | null
          month: number | null
          rate: number | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          created_at?: string
          hours?: number | null
          id?: number
          job_id?: number | null
          month?: number | null
          rate?: number | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string
          hours?: number | null
          id?: number
          job_id?: number | null
          month?: number | null
          rate?: number | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "allocate_hours_2_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      billing_codes: {
        Row: {
          billing_code_abbreviation: string | null
          billing_code_description: string | null
          billing_code_id: number
          billing_code_inactive: boolean | null
          billing_code_name: string | null
          created_at: string | null
        }
        Insert: {
          billing_code_abbreviation?: string | null
          billing_code_description?: string | null
          billing_code_id?: number
          billing_code_inactive?: boolean | null
          billing_code_name?: string | null
          created_at?: string | null
        }
        Update: {
          billing_code_abbreviation?: string | null
          billing_code_description?: string | null
          billing_code_id?: number
          billing_code_inactive?: boolean | null
          billing_code_name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          categories_code: string | null
          categories_description: string | null
          categories_id: number
          categories_inactive: boolean | null
          categories_name: string | null
          categories_non_billable: string | null
          categories_taxable: string | null
          created_ad: string | null
        }
        Insert: {
          categories_code?: string | null
          categories_description?: string | null
          categories_id?: number
          categories_inactive?: boolean | null
          categories_name?: string | null
          categories_non_billable?: string | null
          categories_taxable?: string | null
          created_ad?: string | null
        }
        Update: {
          categories_code?: string | null
          categories_description?: string | null
          categories_id?: number
          categories_inactive?: boolean | null
          categories_name?: string | null
          categories_non_billable?: string | null
          categories_taxable?: string | null
          created_ad?: string | null
        }
        Relationships: []
      }
      client: {
        Row: {
          address: string | null
          city: string | null
          client_lead: string | null
          country: string | null
          created_at: string | null
          currency: number | null
          email: string | null
          id: number
          is_international: string | null
          legal_name: string | null
          name: string | null
          notes: string | null
          phone: string | null
          poc: number | null
          postcode: string | null
          tier: number | null
          type: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          client_lead?: string | null
          country?: string | null
          created_at?: string | null
          currency?: number | null
          email?: string | null
          id?: number
          is_international?: string | null
          legal_name?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          poc?: number | null
          postcode?: string | null
          tier?: number | null
          type?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          client_lead?: string | null
          country?: string | null
          created_at?: string | null
          currency?: number | null
          email?: string | null
          id?: number
          is_international?: string | null
          legal_name?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          poc?: number | null
          postcode?: string | null
          tier?: number | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_client_lead_fkey"
            columns: ["client_lead"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "client_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currency"
            referencedColumns: ["currency_id"]
          },
          {
            foreignKeyName: "client_poc_fkey"
            columns: ["poc"]
            isOneToOne: false
            referencedRelation: "client_contact"
            referencedColumns: ["client_contact_id"]
          }
        ]
      }
      client_contact: {
        Row: {
          client_contact_company_name: number | null
          client_contact_email: string | null
          client_contact_first_name: string | null
          client_contact_id: number
          client_contact_last_name: string | null
          client_contact_phone: string | null
          client_contact_role: number | null
          client_contact_title: string | null
          client_contact_type: string | null
          client_lead: boolean | null
          client_poc: boolean | null
          created_at: string | null
        }
        Insert: {
          client_contact_company_name?: number | null
          client_contact_email?: string | null
          client_contact_first_name?: string | null
          client_contact_id?: number
          client_contact_last_name?: string | null
          client_contact_phone?: string | null
          client_contact_role?: number | null
          client_contact_title?: string | null
          client_contact_type?: string | null
          client_lead?: boolean | null
          client_poc?: boolean | null
          created_at?: string | null
        }
        Update: {
          client_contact_company_name?: number | null
          client_contact_email?: string | null
          client_contact_first_name?: string | null
          client_contact_id?: number
          client_contact_last_name?: string | null
          client_contact_phone?: string | null
          client_contact_role?: number | null
          client_contact_title?: string | null
          client_contact_type?: string | null
          client_lead?: boolean | null
          client_poc?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      client_type: {
        Row: {
          client_type_abbreviation: string | null
          client_type_description: string | null
          client_type_id: number
          client_type_inactive: boolean | null
          client_type_name: string | null
          created_at: string | null
        }
        Insert: {
          client_type_abbreviation?: string | null
          client_type_description?: string | null
          client_type_id?: number
          client_type_inactive?: boolean | null
          client_type_name?: string | null
          created_at?: string | null
        }
        Update: {
          client_type_abbreviation?: string | null
          client_type_description?: string | null
          client_type_id?: number
          client_type_inactive?: boolean | null
          client_type_name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      contact_type: {
        Row: {
          contact_type_abbreviation: string | null
          contact_type_description: string | null
          contact_type_id: number
          contact_type_inactive: boolean | null
          contact_type_name: string | null
          created_at: string | null
        }
        Insert: {
          contact_type_abbreviation?: string | null
          contact_type_description?: string | null
          contact_type_id?: number
          contact_type_inactive?: boolean | null
          contact_type_name?: string | null
          created_at?: string | null
        }
        Update: {
          contact_type_abbreviation?: string | null
          contact_type_description?: string | null
          contact_type_id?: number
          contact_type_inactive?: boolean | null
          contact_type_name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      currency: {
        Row: {
          created_at: string | null
          currency_id: number
          currency_name: string | null
          currency_symbol: string
        }
        Insert: {
          created_at?: string | null
          currency_id?: number
          currency_name?: string | null
          currency_symbol: string
        }
        Update: {
          created_at?: string | null
          currency_id?: number
          currency_name?: string | null
          currency_symbol?: string
        }
        Relationships: []
      }
      department: {
        Row: {
          created_at: string | null
          department_abbreviation: string | null
          department_description: string | null
          department_id: number
          department_inactive: boolean | null
          department_name: string | null
        }
        Insert: {
          created_at?: string | null
          department_abbreviation?: string | null
          department_description?: string | null
          department_id?: number
          department_inactive?: boolean | null
          department_name?: string | null
        }
        Update: {
          created_at?: string | null
          department_abbreviation?: string | null
          department_description?: string | null
          department_id?: number
          department_inactive?: boolean | null
          department_name?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_date: string | null
          event_end_time: string | null
          event_id: number
          event_time: string | null
          event_title: string | null
        }
        Insert: {
          created_at?: string | null
          event_date?: string | null
          event_end_time?: string | null
          event_id?: number
          event_time?: string | null
          event_title?: string | null
        }
        Update: {
          created_at?: string | null
          event_date?: string | null
          event_end_time?: string | null
          event_id?: number
          event_time?: string | null
          event_title?: string | null
        }
        Relationships: []
      }
      job_categories: {
        Row: {
          created_at: string | null
          job_category_abbreviation: string | null
          job_category_description: string | null
          job_category_id: number
          job_category_inactive: boolean | null
          job_category_name: string | null
        }
        Insert: {
          created_at?: string | null
          job_category_abbreviation?: string | null
          job_category_description?: string | null
          job_category_id?: number
          job_category_inactive?: boolean | null
          job_category_name?: string | null
        }
        Update: {
          created_at?: string | null
          job_category_abbreviation?: string | null
          job_category_description?: string | null
          job_category_id?: number
          job_category_inactive?: boolean | null
          job_category_name?: string | null
        }
        Relationships: []
      }
      job_names: {
        Row: {
          created_at: string | null
          job_category_id: string | null
          job_name_abbreviation: string | null
          job_name_description: string | null
          job_name_id: number
          job_name_inactive: boolean | null
          job_name_name: string | null
        }
        Insert: {
          created_at?: string | null
          job_category_id?: string | null
          job_name_abbreviation?: string | null
          job_name_description?: string | null
          job_name_id?: number
          job_name_inactive?: boolean | null
          job_name_name?: string | null
        }
        Update: {
          created_at?: string | null
          job_category_id?: string | null
          job_name_abbreviation?: string | null
          job_name_description?: string | null
          job_name_id?: number
          job_name_inactive?: boolean | null
          job_name_name?: string | null
        }
        Relationships: []
      }
      job_rates: {
        Row: {
          created_at: string | null
          job_rate_id: number
          job_rate_name: string | null
          job_rate_value: number | null
        }
        Insert: {
          created_at?: string | null
          job_rate_id?: number
          job_rate_name?: string | null
          job_rate_value?: number | null
        }
        Update: {
          created_at?: string | null
          job_rate_id?: number
          job_rate_name?: string | null
          job_rate_value?: number | null
        }
        Relationships: []
      }
      job_tasks: {
        Row: {
          created_at: string
          id: number
          job_id: number | null
          jobs_id: number | null
          task_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_id?: number | null
          jobs_id?: number | null
          task_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          job_id?: number | null
          jobs_id?: number | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "job_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["task_id"]
          }
        ]
      }
      job_team: {
        Row: {
          created_at: string | null
          id: number
          job_id: number | null
          poc: boolean | null
          rate: number | null
          team_lead: boolean | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          job_id?: number | null
          poc?: boolean | null
          rate?: number | null
          team_lead?: boolean | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          job_id?: number | null
          poc?: boolean | null
          rate?: number | null
          team_lead?: boolean | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "all_tasks_demo"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "job_team_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "wolfgang_jobs_demo"
            referencedColumns: ["job_id"]
          }
        ]
      }
      job_type: {
        Row: {
          created_at: string | null
          job_type_abbreviation: string | null
          job_type_description: string | null
          job_type_id: number
          job_type_inactive: boolean | null
          job_type_name: string | null
        }
        Insert: {
          created_at?: string | null
          job_type_abbreviation?: string | null
          job_type_description?: string | null
          job_type_id?: number
          job_type_inactive?: boolean | null
          job_type_name?: string | null
        }
        Update: {
          created_at?: string | null
          job_type_abbreviation?: string | null
          job_type_description?: string | null
          job_type_id?: number
          job_type_inactive?: boolean | null
          job_type_name?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          allow_all_to_bill: boolean | null
          created_at: string | null
          hours_non_billable: boolean | null
          id: number
          job_category_id: number | null
          job_client_contact_id: number | null
          job_client_id: number
          job_currency_id: number | null
          job_current_status: number | null
          job_default_category: number | null
          job_default_invoice_notes: string | null
          job_default_tax_rate: number | null
          job_department_id: number | null
          job_deposit_amount: number | null
          job_deposit_minimum: number | null
          job_due_date: string | null
          job_id: number
          job_location_id: number | null
          job_name: string | null
          job_name_id: number | null
          job_notes: string | null
          job_po_number: number | null
          job_start_date: string | null
          job_status_notes: string | null
          job_type: number | null
          project_id: number | null
        }
        Insert: {
          allow_all_to_bill?: boolean | null
          created_at?: string | null
          hours_non_billable?: boolean | null
          id?: number
          job_category_id?: number | null
          job_client_contact_id?: number | null
          job_client_id: number
          job_currency_id?: number | null
          job_current_status?: number | null
          job_default_category?: number | null
          job_default_invoice_notes?: string | null
          job_default_tax_rate?: number | null
          job_department_id?: number | null
          job_deposit_amount?: number | null
          job_deposit_minimum?: number | null
          job_due_date?: string | null
          job_id: number
          job_location_id?: number | null
          job_name?: string | null
          job_name_id?: number | null
          job_notes?: string | null
          job_po_number?: number | null
          job_start_date?: string | null
          job_status_notes?: string | null
          job_type?: number | null
          project_id?: number | null
        }
        Update: {
          allow_all_to_bill?: boolean | null
          created_at?: string | null
          hours_non_billable?: boolean | null
          id?: number
          job_category_id?: number | null
          job_client_contact_id?: number | null
          job_client_id?: number
          job_currency_id?: number | null
          job_current_status?: number | null
          job_default_category?: number | null
          job_default_invoice_notes?: string | null
          job_default_tax_rate?: number | null
          job_department_id?: number | null
          job_deposit_amount?: number | null
          job_deposit_minimum?: number | null
          job_due_date?: string | null
          job_id?: number
          job_location_id?: number | null
          job_name?: string | null
          job_name_id?: number | null
          job_notes?: string | null
          job_po_number?: number | null
          job_start_date?: string | null
          job_status_notes?: string | null
          job_type?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_client_contact_id_fkey"
            columns: ["job_client_contact_id"]
            isOneToOne: false
            referencedRelation: "client_contact"
            referencedColumns: ["client_contact_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_overview_v2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_department_id_fkey"
            columns: ["job_department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          }
        ]
      }
      project: {
        Row: {
          created_at: string | null
          project_abbreviation: string | null
          project_description: string | null
          project_id: number
          project_inactive: boolean | null
          project_name: string | null
        }
        Insert: {
          created_at?: string | null
          project_abbreviation?: string | null
          project_description?: string | null
          project_id?: number
          project_inactive?: boolean | null
          project_name?: string | null
        }
        Update: {
          created_at?: string | null
          project_abbreviation?: string | null
          project_description?: string | null
          project_id?: number
          project_inactive?: boolean | null
          project_name?: string | null
        }
        Relationships: []
      }
      project_job_task: {
        Row: {
          created_at: string
          id: number
          job_name_id: number | null
          project_id: number | null
          task_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_name_id?: number | null
          project_id?: number | null
          task_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          job_name_id?: number | null
          project_id?: number | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["task_id"]
          }
        ]
      }
      project_jobs: {
        Row: {
          created_at: string
          id: number
          job_name_id: number | null
          project_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_name_id?: number | null
          project_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          job_name_id?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          }
        ]
      }
      staff_member_status: {
        Row: {
          created_at: string | null
          staff_member_status: string | null
          staff_member_status_abbreviation: string | null
          staff_member_status_description: string | null
          staff_member_status_id: number
          staff_member_status_inactive: boolean | null
        }
        Insert: {
          created_at?: string | null
          staff_member_status?: string | null
          staff_member_status_abbreviation?: string | null
          staff_member_status_description?: string | null
          staff_member_status_id?: number
          staff_member_status_inactive?: boolean | null
        }
        Update: {
          created_at?: string | null
          staff_member_status?: string | null
          staff_member_status_abbreviation?: string | null
          staff_member_status_description?: string | null
          staff_member_status_id?: number
          staff_member_status_inactive?: boolean | null
        }
        Relationships: []
      }
      staff_teams: {
        Row: {
          created_at: string | null
          staff_team_abbreviation: string | null
          staff_Team_description: string | null
          staff_team_id: number
          staff_team_inactive: boolean | null
          staff_team_name: string | null
        }
        Insert: {
          created_at?: string | null
          staff_team_abbreviation?: string | null
          staff_Team_description?: string | null
          staff_team_id?: number
          staff_team_inactive?: boolean | null
          staff_team_name?: string | null
        }
        Update: {
          created_at?: string | null
          staff_team_abbreviation?: string | null
          staff_Team_description?: string | null
          staff_team_id?: number
          staff_team_inactive?: boolean | null
          staff_team_name?: string | null
        }
        Relationships: []
      }
      status_codes: {
        Row: {
          created_at: string | null
          status_code_abbreviation: string | null
          status_code_description: string | null
          status_code_id: number
          status_code_inactive: boolean | null
          status_code_name: string | null
        }
        Insert: {
          created_at?: string | null
          status_code_abbreviation?: string | null
          status_code_description?: string | null
          status_code_id?: number
          status_code_inactive?: boolean | null
          status_code_name?: string | null
        }
        Update: {
          created_at?: string | null
          status_code_abbreviation?: string | null
          status_code_description?: string | null
          status_code_id?: number
          status_code_inactive?: boolean | null
          status_code_name?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          task_description: string | null
          task_id: number
          task_inactive: boolean | null
          task_name: string | null
          task_name_abbreviation: string | null
        }
        Insert: {
          created_at?: string | null
          task_description?: string | null
          task_id?: number
          task_inactive?: boolean | null
          task_name?: string | null
          task_name_abbreviation?: string | null
        }
        Update: {
          created_at?: string | null
          task_description?: string | null
          task_id?: number
          task_inactive?: boolean | null
          task_name?: string | null
          task_name_abbreviation?: string | null
        }
        Relationships: []
      }
      tax_rates: {
        Row: {
          created_at: string | null
          tax_rate_abbreviation: string | null
          tax_rate_description: string | null
          tax_rate_id: number
          tax_rate_inactive: boolean | null
          tax_rate_name: string | null
          tax_rate_percent: string | null
        }
        Insert: {
          created_at?: string | null
          tax_rate_abbreviation?: string | null
          tax_rate_description?: string | null
          tax_rate_id?: number
          tax_rate_inactive?: boolean | null
          tax_rate_name?: string | null
          tax_rate_percent?: string | null
        }
        Update: {
          created_at?: string | null
          tax_rate_abbreviation?: string | null
          tax_rate_description?: string | null
          tax_rate_id?: number
          tax_rate_inactive?: boolean | null
          tax_rate_name?: string | null
          tax_rate_percent?: string | null
        }
        Relationships: []
      }
      team_roles: {
        Row: {
          created_at: string | null
          team_role_abbreviation: string | null
          team_role_description: string | null
          team_role_id: number
          team_role_inactive: boolean | null
          team_role_name: string | null
        }
        Insert: {
          created_at?: string | null
          team_role_abbreviation?: string | null
          team_role_description?: string | null
          team_role_id?: number
          team_role_inactive?: boolean | null
          team_role_name?: string | null
        }
        Update: {
          created_at?: string | null
          team_role_abbreviation?: string | null
          team_role_description?: string | null
          team_role_id?: number
          team_role_inactive?: boolean | null
          team_role_name?: string | null
        }
        Relationships: []
      }
      tier: {
        Row: {
          created_at: string | null
          tier_abbreviation: string | null
          tier_description: string | null
          tier_id: number
          tier_inactive: boolean | null
          tier_name: string | null
        }
        Insert: {
          created_at?: string | null
          tier_abbreviation?: string | null
          tier_description?: string | null
          tier_id?: number
          tier_inactive?: boolean | null
          tier_name?: string | null
        }
        Update: {
          created_at?: string | null
          tier_abbreviation?: string | null
          tier_description?: string | null
          tier_id?: number
          tier_inactive?: boolean | null
          tier_name?: string | null
        }
        Relationships: []
      }
      timesheet_rows: {
        Row: {
          created_at: string
          date: string | null
          id: number
          job_id: number | null
          jobs_id: number | null
          month: number | null
          not_chargeable: boolean | null
          notes: string
          project_id: number | null
          rate: number
          staff_id: string | null
          task_id: number | null
          time: number
          unsubmitted: boolean | null
          year: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          job_id?: number | null
          jobs_id?: number | null
          month?: number | null
          not_chargeable?: boolean | null
          notes: string
          project_id?: number | null
          rate?: number
          staff_id?: string | null
          task_id?: number | null
          time: number
          unsubmitted?: boolean | null
          year?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          job_id?: number | null
          jobs_id?: number | null
          month?: number | null
          not_chargeable?: boolean | null
          notes?: string
          project_id?: number | null
          rate?: number
          staff_id?: string | null
          task_id?: number | null
          time?: number
          unsubmitted?: boolean | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_jobs_id_fkey"
            columns: ["jobs_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      timesheet_rows_2: {
        Row: {
          created_at: string
          date: string | null
          id: number
          job_id: number | null
          job_name_id: number | null
          not_chargeable: boolean | null
          notes: string
          project_id: number | null
          rate: number
          staff_id: string | null
          task_id: number | null
          time: number
          unsubmitted: boolean | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          job_id?: number | null
          job_name_id?: number | null
          not_chargeable?: boolean | null
          notes: string
          project_id?: number | null
          rate?: number
          staff_id?: string | null
          task_id?: number | null
          time: number
          unsubmitted?: boolean | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          job_id?: number | null
          job_name_id?: number | null
          not_chargeable?: boolean | null
          notes?: string
          project_id?: number | null
          rate?: number
          staff_id?: string | null
          task_id?: number | null
          time?: number
          unsubmitted?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["jobs_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "timesheet_rows_2_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["task_id"]
          }
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          user_role_abbreviation: string | null
          user_role_description: string | null
          user_role_id: number
          user_role_inactive: boolean | null
          user_role_name: string | null
        }
        Insert: {
          created_at?: string | null
          user_role_abbreviation?: string | null
          user_role_description?: string | null
          user_role_id?: number
          user_role_inactive?: boolean | null
          user_role_name?: string | null
        }
        Update: {
          created_at?: string | null
          user_role_abbreviation?: string | null
          user_role_description?: string | null
          user_role_id?: number
          user_role_inactive?: boolean | null
          user_role_name?: string | null
        }
        Relationships: []
      }
      user_task_assign: {
        Row: {
          created_at: string
          id: number
          job_task_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_task_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          job_task_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_task_assign_job_task_id_fkey"
            columns: ["job_task_id"]
            isOneToOne: false
            referencedRelation: "job_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_task_assign_job_task_id_fkey"
            columns: ["job_task_id"]
            isOneToOne: false
            referencedRelation: "job_tasks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dept_join"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_task_assign_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          user_department: number | null
          user_email: string | null
          user_id: string
          user_job_rate_1: number
          user_job_rate_2: number
          user_job_rate_3: number
          user_job_rate_4: number
          user_job_rate_5: number
          user_name: string | null
          user_role: string | null
          user_status: string | null
        }
        Insert: {
          user_department?: number | null
          user_email?: string | null
          user_id?: string
          user_job_rate_1?: number
          user_job_rate_2?: number
          user_job_rate_3?: number
          user_job_rate_4?: number
          user_job_rate_5?: number
          user_name?: string | null
          user_role?: string | null
          user_status?: string | null
        }
        Update: {
          user_department?: number | null
          user_email?: string | null
          user_id?: string
          user_job_rate_1?: number
          user_job_rate_2?: number
          user_job_rate_3?: number
          user_job_rate_4?: number
          user_job_rate_5?: number
          user_name?: string | null
          user_role?: string | null
          user_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_department_fkey"
            columns: ["user_department"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["department_id"]
          }
        ]
      }
    }
    Views: {
      all_tasks_demo: {
        Row: {
          job_id: number | null
          job_name: string | null
          name: string | null
          task_name: string | null
        }
        Relationships: []
      }
      all_timesheet_rows_view: {
        Row: {
          client_id: number | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      allocate_hours_view: {
        Row: {
          client_id: number | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          job_name_name: string | null
          jobs_id: number | null
          month: number | null
          name: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      allocate_hours_view_2: {
        Row: {
          hours: number | null
          id: number | null
          job_name_name: string | null
          month: number | null
          name: string | null
          project_name: string | null
          task_name: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: []
      }
      client_detail: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          currency_symbol: string | null
          email: string | null
          id: number | null
          legal_name: string | null
          name: string | null
          notes: string | null
          phone: string | null
          postcode: string | null
          tier_name: string | null
          user_name: string | null
        }
        Relationships: []
      }
      client_overview: {
        Row: {
          address: string | null
          id: number | null
          legal_name: string | null
          name: string | null
          tier_name: string | null
          user_name: string | null
        }
        Relationships: []
      }
      client_overview_v2: {
        Row: {
          address: string | null
          id: number | null
          legal_name: string | null
          name: string | null
          tier_name: string | null
          user_name: string | null
        }
        Relationships: []
      }
      clients_with_jobs: {
        Row: {
          job_client_id: number | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "client_overview_v2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "jobs_job_client_id_fkey"
            columns: ["job_client_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["client_id"]
          }
        ]
      }
      job_list_header: {
        Row: {
          client_name: string | null
          count: number | null
        }
        Relationships: []
      }
      job_tasks_view: {
        Row: {
          client_job: string | null
          id: number | null
          job_id: number | null
          task_name: string | null
        }
        Relationships: []
      }
      jobs_overview_with_projects: {
        Row: {
          client_id: number | null
          client_name: string | null
          currency_symbol: string | null
          department_name: string | null
          id: number | null
          job_id: number | null
          job_name_id: number | null
          job_name_name: string | null
          job_type_name: string | null
          project_id: number | null
          project_name: string | null
          status_code_name: string | null
          tier_name: string | null
        }
        Relationships: []
      }
      jobs_overview_with_projects_2: {
        Row: {
          client_name: string | null
          id: number | null
          job_id: number | null
          job_name_id: number | null
          job_name_name: string | null
          job_type_name: string | null
          project_id: number | null
          project_name: string | null
          tier_name: string | null
        }
        Relationships: []
      }
      monthly_timesheet_rows_view: {
        Row: {
          allocate_hours_month: number | null
          allocate_hours_year: number | null
          client_id: number | null
          completed: boolean | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      project_job_task_view: {
        Row: {
          job_id: number | null
          job_name_name: string | null
          project_id: number | null
          project_name: string | null
          task_id: number | null
          task_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_job_name_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["task_id"]
          },
          {
            foreignKeyName: "project_job_task_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["task_id"]
          }
        ]
      }
      project_jobs_view: {
        Row: {
          job_name_id: number | null
          job_name_name: string | null
          project_id: number | null
          project_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "all_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "allocate_hours_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "monthly_timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v2"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v3"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "timesheet_rows_view_v4"
            referencedColumns: ["project_id"]
          }
        ]
      }
      timesheet_rows_view: {
        Row: {
          client_id: number | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      timesheet_rows_view_v2: {
        Row: {
          client_id: number | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      timesheet_rows_view_v3: {
        Row: {
          allocate_hours_month: number | null
          allocate_hours_year: number | null
          client_id: number | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      timesheet_rows_view_v4: {
        Row: {
          allocate_hours_month: number | null
          allocate_hours_year: number | null
          client_id: number | null
          completed: boolean | null
          date: string | null
          hours: number | null
          id: number | null
          job_id: number | null
          job_name: string | null
          job_name_id: number | null
          jobs_id: number | null
          month: number | null
          name: string | null
          notes: string | null
          project_id: number | null
          project_name: string | null
          rate: number | null
          task_id: number | null
          task_name: string | null
          time: number | null
          user_id: string | null
          user_name: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "job_names"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects"
            referencedColumns: ["job_name_id"]
          },
          {
            foreignKeyName: "jobs_job_name_id_fkey"
            columns: ["job_name_id"]
            isOneToOne: false
            referencedRelation: "jobs_overview_with_projects_2"
            referencedColumns: ["job_name_id"]
          }
        ]
      }
      user_dept_join: {
        Row: {
          department_name: string | null
          user_email: string | null
          user_id: string | null
          user_job_rate_1: number | null
          user_job_rate_2: number | null
          user_job_rate_3: number | null
          user_job_rate_4: number | null
          user_job_rate_5: number | null
          user_name: string | null
        }
        Relationships: []
      }
      wolfgang_jobs_demo: {
        Row: {
          job_id: number | null
          job_name: string | null
          name: string | null
          task_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
