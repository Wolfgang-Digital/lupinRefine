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
					action_abbreviation: string | null;
					action_description: string | null;
					action_id: number;
					action_inactive: boolean | null;
					action_name: string | null;
					created_at: string | null;
				};
				Insert: {
					action_abbreviation?: string | null;
					action_description?: string | null;
					action_id: number;
					action_inactive?: boolean | null;
					action_name?: string | null;
					created_at?: string | null;
				};
				Update: {
					action_abbreviation?: string | null;
					action_description?: string | null;
					action_id?: number;
					action_inactive?: boolean | null;
					action_name?: string | null;
					created_at?: string | null;
				};
				Relationships: [];
			};
			billing_codes: {
				Row: {
					billing_code_abbreviation: string | null;
					billing_code_description: string | null;
					billing_code_id: number;
					billing_code_inactive: boolean | null;
					billing_code_name: string | null;
					created_at: string | null;
				};
				Insert: {
					billing_code_abbreviation?: string | null;
					billing_code_description?: string | null;
					billing_code_id: number;
					billing_code_inactive?: boolean | null;
					billing_code_name?: string | null;
					created_at?: string | null;
				};
				Update: {
					billing_code_abbreviation?: string | null;
					billing_code_description?: string | null;
					billing_code_id?: number;
					billing_code_inactive?: boolean | null;
					billing_code_name?: string | null;
					created_at?: string | null;
				};
				Relationships: [];
			};
			categories: {
				Row: {
					categories_code: string | null;
					categories_description: string | null;
					categories_id: number;
					categories_inactive: boolean | null;
					categories_name: string | null;
					categories_non_billable: string | null;
					categories_taxable: string | null;
					created_ad: string | null;
				};
				Insert: {
					categories_code?: string | null;
					categories_description?: string | null;
					categories_id: number;
					categories_inactive?: boolean | null;
					categories_name?: string | null;
					categories_non_billable?: string | null;
					categories_taxable?: string | null;
					created_ad?: string | null;
				};
				Update: {
					categories_code?: string | null;
					categories_description?: string | null;
					categories_id?: number;
					categories_inactive?: boolean | null;
					categories_name?: string | null;
					categories_non_billable?: string | null;
					categories_taxable?: string | null;
					created_ad?: string | null;
				};
				Relationships: [];
			};
			client: {
				Row: {
					address_line1: string | null;
					address_line2: string | null;
					address_line3: string | null;
					city: string | null;
					client_lead: number | null;
					country: string | null;
					created_at: string | null;
					currency: number | null;
					email: string | null;
					id: number;
					is_international: string | null;
					legal_name: string | null;
					name: string | null;
					notes: string | null;
					phone: string | null;
					poc: number | null;
					postcode: string | null;
					tier: number | null;
					type: number | null;
				};
				Insert: {
					address_line1?: string | null;
					address_line2?: string | null;
					address_line3?: string | null;
					city?: string | null;
					client_lead?: number | null;
					country?: string | null;
					created_at?: string | null;
					currency?: number | null;
					email?: string | null;
					id: number;
					is_international?: string | null;
					legal_name?: string | null;
					name?: string | null;
					notes?: string | null;
					phone?: string | null;
					poc?: number | null;
					postcode?: string | null;
					tier?: number | null;
					type?: number | null;
				};
				Update: {
					address_line1?: string | null;
					address_line2?: string | null;
					address_line3?: string | null;
					city?: string | null;
					client_lead?: number | null;
					country?: string | null;
					created_at?: string | null;
					currency?: number | null;
					email?: string | null;
					id?: number;
					is_international?: string | null;
					legal_name?: string | null;
					name?: string | null;
					notes?: string | null;
					phone?: string | null;
					poc?: number | null;
					postcode?: string | null;
					tier?: number | null;
					type?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "client_client_lead_fkey";
						columns: ["client_lead"];
						referencedRelation: "wolfgangers";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "client_client_lead_fkey";
						columns: ["client_lead"];
						referencedRelation: "user_dept_join";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "client_client_lead_fkey";
						columns: ["client_lead"];
						referencedRelation: "user_dept_join_v2";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "client_currency_fkey";
						columns: ["currency"];
						referencedRelation: "currency";
						referencedColumns: ["currency_id"];
					},
					{
						foreignKeyName: "client_poc_fkey";
						columns: ["poc"];
						referencedRelation: "client_contact";
						referencedColumns: ["client_contact_id"];
					},
					{
						foreignKeyName: "client_tier_fkey";
						columns: ["tier"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					},
					{
						foreignKeyName: "client_type_fkey";
						columns: ["type"];
						referencedRelation: "client_type";
						referencedColumns: ["client_type_id"];
					}
				];
			};
			client_contact: {
				Row: {
					client_contact_company_name: number | null;
					client_contact_email: string | null;
					client_contact_first_name: string | null;
					client_contact_id: number;
					client_contact_last_name: string | null;
					client_contact_phone: string | null;
					client_contact_role: number | null;
					client_contact_title: string | null;
					client_contact_type: string | null;
					client_lead: boolean | null;
					client_poc: boolean | null;
					created_at: string | null;
				};
				Insert: {
					client_contact_company_name?: number | null;
					client_contact_email?: string | null;
					client_contact_first_name?: string | null;
					client_contact_id?: number;
					client_contact_last_name?: string | null;
					client_contact_phone?: string | null;
					client_contact_role?: number | null;
					client_contact_title?: string | null;
					client_contact_type?: string | null;
					client_lead?: boolean | null;
					client_poc?: boolean | null;
					created_at?: string | null;
				};
				Update: {
					client_contact_company_name?: number | null;
					client_contact_email?: string | null;
					client_contact_first_name?: string | null;
					client_contact_id?: number;
					client_contact_last_name?: string | null;
					client_contact_phone?: string | null;
					client_contact_role?: number | null;
					client_contact_title?: string | null;
					client_contact_type?: string | null;
					client_lead?: boolean | null;
					client_poc?: boolean | null;
					created_at?: string | null;
				};
				Relationships: [];
			};
			client_type: {
				Row: {
					client_type_abbreviation: string | null;
					client_type_description: string | null;
					client_type_id: number;
					client_type_inactive: boolean | null;
					client_type_name: string | null;
					created_at: string | null;
				};
				Insert: {
					client_type_abbreviation?: string | null;
					client_type_description?: string | null;
					client_type_id: number;
					client_type_inactive?: boolean | null;
					client_type_name?: string | null;
					created_at?: string | null;
				};
				Update: {
					client_type_abbreviation?: string | null;
					client_type_description?: string | null;
					client_type_id?: number;
					client_type_inactive?: boolean | null;
					client_type_name?: string | null;
					created_at?: string | null;
				};
				Relationships: [];
			};
			contact_type: {
				Row: {
					contact_type_abbreviation: string | null;
					contact_type_description: string | null;
					contact_type_id: number;
					contact_type_inactive: boolean | null;
					contact_type_name: string | null;
					created_at: string | null;
				};
				Insert: {
					contact_type_abbreviation?: string | null;
					contact_type_description?: string | null;
					contact_type_id: number;
					contact_type_inactive?: boolean | null;
					contact_type_name?: string | null;
					created_at?: string | null;
				};
				Update: {
					contact_type_abbreviation?: string | null;
					contact_type_description?: string | null;
					contact_type_id?: number;
					contact_type_inactive?: boolean | null;
					contact_type_name?: string | null;
					created_at?: string | null;
				};
				Relationships: [];
			};
			countries: {
				Row: {
					continent: Database["public"]["Enums"]["continents"] | null;
					created_at: string | null;
					id: number;
					iso2: string;
					iso3: string | null;
					local_name: string | null;
					name: string | null;
				};
				Insert: {
					continent?: Database["public"]["Enums"]["continents"] | null;
					created_at?: string | null;
					id?: number;
					iso2: string;
					iso3?: string | null;
					local_name?: string | null;
					name?: string | null;
				};
				Update: {
					continent?: Database["public"]["Enums"]["continents"] | null;
					created_at?: string | null;
					id?: number;
					iso2?: string;
					iso3?: string | null;
					local_name?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			currency: {
				Row: {
					created_at: string | null;
					currency_id: number;
					currency_name: string | null;
					currency_symbol: string;
				};
				Insert: {
					created_at?: string | null;
					currency_id?: number;
					currency_name?: string | null;
					currency_symbol: string;
				};
				Update: {
					created_at?: string | null;
					currency_id?: number;
					currency_name?: string | null;
					currency_symbol?: string;
				};
				Relationships: [];
			};
			department: {
				Row: {
					created_at: string | null;
					department_abbreviation: string | null;
					department_description: string | null;
					department_id: number;
					department_inactive: boolean | null;
					department_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					department_abbreviation?: string | null;
					department_description?: string | null;
					department_id?: number;
					department_inactive?: boolean | null;
					department_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					department_abbreviation?: string | null;
					department_description?: string | null;
					department_id?: number;
					department_inactive?: boolean | null;
					department_name?: string | null;
				};
				Relationships: [];
			};
			events: {
				Row: {
					created_at: string | null;
					event_date: string | null;
					event_end_time: string | null;
					event_id: number;
					event_time: string | null;
					event_title: string | null;
				};
				Insert: {
					created_at?: string | null;
					event_date?: string | null;
					event_end_time?: string | null;
					event_id?: number;
					event_time?: string | null;
					event_title?: string | null;
				};
				Update: {
					created_at?: string | null;
					event_date?: string | null;
					event_end_time?: string | null;
					event_id?: number;
					event_time?: string | null;
					event_title?: string | null;
				};
				Relationships: [];
			};
			job_categories: {
				Row: {
					created_at: string | null;
					job_category_abbreviation: string | null;
					job_category_description: string | null;
					job_category_id: number;
					job_category_inactive: boolean | null;
					job_category_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					job_category_abbreviation?: string | null;
					job_category_description?: string | null;
					job_category_id: number;
					job_category_inactive?: boolean | null;
					job_category_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					job_category_abbreviation?: string | null;
					job_category_description?: string | null;
					job_category_id?: number;
					job_category_inactive?: boolean | null;
					job_category_name?: string | null;
				};
				Relationships: [];
			};
			job_names: {
				Row: {
					created_at: string | null;
					job_category_id: string | null;
					job_name_abbreviation: string | null;
					job_name_description: string | null;
					job_name_id: number;
					job_name_inactive: boolean | null;
					job_name_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					job_category_id?: string | null;
					job_name_abbreviation?: string | null;
					job_name_description?: string | null;
					job_name_id: number;
					job_name_inactive?: boolean | null;
					job_name_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					job_category_id?: string | null;
					job_name_abbreviation?: string | null;
					job_name_description?: string | null;
					job_name_id?: number;
					job_name_inactive?: boolean | null;
					job_name_name?: string | null;
				};
				Relationships: [];
			};
			job_rates: {
				Row: {
					created_at: string | null;
					job_rate_id: number;
					job_rate_name: string | null;
					job_rate_value: number | null;
				};
				Insert: {
					created_at?: string | null;
					job_rate_id: number;
					job_rate_name?: string | null;
					job_rate_value?: number | null;
				};
				Update: {
					created_at?: string | null;
					job_rate_id?: number;
					job_rate_name?: string | null;
					job_rate_value?: number | null;
				};
				Relationships: [];
			};
			job_tasks: {
				Row: {
					created_at: string;
					id: number;
					job_id: number | null;
					task_id: number | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					job_id?: number | null;
					task_id?: number | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					job_id?: number | null;
					task_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "jobs";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_currency_status_type_join";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_team_client_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view_v2";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "timesheet_jobsresponse_dropdown";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_tasks_task_id_fkey";
						columns: ["task_id"];
						referencedRelation: "tasks";
						referencedColumns: ["task_id"];
					}
				];
			};
			job_team: {
				Row: {
					created_at: string | null;
					id: number;
					job_id: number | null;
					poc: boolean | null;
					team_lead: boolean | null;
					user_id: number | null;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					job_id?: number | null;
					poc?: boolean | null;
					team_lead?: boolean | null;
					user_id?: number | null;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					job_id?: number | null;
					poc?: boolean | null;
					team_lead?: boolean | null;
					user_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "jobs";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_currency_status_type_join";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_team_client_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view_v2";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "timesheet_jobsresponse_dropdown";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "job_team_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "wolfgangers";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "job_team_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "user_dept_join";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "job_team_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "user_dept_join_v2";
						referencedColumns: ["user_id"];
					}
				];
			};
			job_type: {
				Row: {
					created_at: string | null;
					job_type_abbreviation: string | null;
					job_type_description: string | null;
					job_type_id: number;
					job_type_inactive: boolean | null;
					job_type_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					job_type_abbreviation?: string | null;
					job_type_description?: string | null;
					job_type_id: number;
					job_type_inactive?: boolean | null;
					job_type_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					job_type_abbreviation?: string | null;
					job_type_description?: string | null;
					job_type_id?: number;
					job_type_inactive?: boolean | null;
					job_type_name?: string | null;
				};
				Relationships: [];
			};
			jobs: {
				Row: {
					allow_all_to_bill: boolean | null;
					created_at: string | null;
					hours_non_billable: boolean | null;
					job_category_id: number | null;
					job_client_contact_id: number | null;
					job_client_id: number;
					job_currency_id: number | null;
					job_current_status: number | null;
					job_default_category: number | null;
					job_default_invoice_notes: string | null;
					job_default_tax_rate: number | null;
					job_department_id: number | null;
					job_deposit_amount: number | null;
					job_deposit_minimum: number | null;
					job_due_date: string | null;
					job_id: number;
					job_location_id: number | null;
					job_name: string;
					job_notes: string | null;
					job_po_number: number | null;
					job_start_date: string | null;
					job_status_notes: string | null;
					job_tier_id: number | null;
					job_type: number | null;
				};
				Insert: {
					allow_all_to_bill?: boolean | null;
					created_at?: string | null;
					hours_non_billable?: boolean | null;
					job_category_id?: number | null;
					job_client_contact_id?: number | null;
					job_client_id: number;
					job_currency_id?: number | null;
					job_current_status?: number | null;
					job_default_category?: number | null;
					job_default_invoice_notes?: string | null;
					job_default_tax_rate?: number | null;
					job_department_id?: number | null;
					job_deposit_amount?: number | null;
					job_deposit_minimum?: number | null;
					job_due_date?: string | null;
					job_id?: number;
					job_location_id?: number | null;
					job_name: string;
					job_notes?: string | null;
					job_po_number?: number | null;
					job_start_date?: string | null;
					job_status_notes?: string | null;
					job_tier_id?: number | null;
					job_type?: number | null;
				};
				Update: {
					allow_all_to_bill?: boolean | null;
					created_at?: string | null;
					hours_non_billable?: boolean | null;
					job_category_id?: number | null;
					job_client_contact_id?: number | null;
					job_client_id?: number;
					job_currency_id?: number | null;
					job_current_status?: number | null;
					job_default_category?: number | null;
					job_default_invoice_notes?: string | null;
					job_default_tax_rate?: number | null;
					job_department_id?: number | null;
					job_deposit_amount?: number | null;
					job_deposit_minimum?: number | null;
					job_due_date?: string | null;
					job_id?: number;
					job_location_id?: number | null;
					job_name?: string;
					job_notes?: string | null;
					job_po_number?: number | null;
					job_start_date?: string | null;
					job_status_notes?: string | null;
					job_tier_id?: number | null;
					job_type?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_category_id_fkey";
						columns: ["job_category_id"];
						referencedRelation: "categories";
						referencedColumns: ["categories_id"];
					},
					{
						foreignKeyName: "jobs_job_client_contact_id_fkey";
						columns: ["job_client_contact_id"];
						referencedRelation: "client_contact";
						referencedColumns: ["client_contact_id"];
					},
					{
						foreignKeyName: "jobs_job_client_id_fkey";
						columns: ["job_client_id"];
						referencedRelation: "client";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "jobs_job_current_status_fkey";
						columns: ["job_current_status"];
						referencedRelation: "status_codes";
						referencedColumns: ["status_code_id"];
					},
					{
						foreignKeyName: "jobs_job_default_category_fkey";
						columns: ["job_default_category"];
						referencedRelation: "categories";
						referencedColumns: ["categories_id"];
					},
					{
						foreignKeyName: "jobs_job_default_tax_rate_fkey";
						columns: ["job_default_tax_rate"];
						referencedRelation: "tax_rates";
						referencedColumns: ["tax_rate_id"];
					},
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					},
					{
						foreignKeyName: "jobs_job_type_fkey";
						columns: ["job_type"];
						referencedRelation: "job_type";
						referencedColumns: ["job_type_id"];
					}
				];
			};
			posts: {
				Row: {
					content: string | null;
					created_at: string;
					id: string;
					title: string | null;
				};
				Insert: {
					content?: string | null;
					created_at?: string;
					id?: string;
					title?: string | null;
				};
				Update: {
					content?: string | null;
					created_at?: string;
					id?: string;
					title?: string | null;
				};
				Relationships: [];
			};
			staff_member_status: {
				Row: {
					created_at: string | null;
					staff_member_status: string | null;
					staff_member_status_abbreviation: string | null;
					staff_member_status_description: string | null;
					staff_member_status_id: number;
					staff_member_status_inactive: boolean | null;
				};
				Insert: {
					created_at?: string | null;
					staff_member_status?: string | null;
					staff_member_status_abbreviation?: string | null;
					staff_member_status_description?: string | null;
					staff_member_status_id: number;
					staff_member_status_inactive?: boolean | null;
				};
				Update: {
					created_at?: string | null;
					staff_member_status?: string | null;
					staff_member_status_abbreviation?: string | null;
					staff_member_status_description?: string | null;
					staff_member_status_id?: number;
					staff_member_status_inactive?: boolean | null;
				};
				Relationships: [];
			};
			staff_teams: {
				Row: {
					created_at: string | null;
					staff_team_abbreviation: string | null;
					staff_Team_description: string | null;
					staff_team_id: number;
					staff_team_inactive: boolean | null;
					staff_team_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					staff_team_abbreviation?: string | null;
					staff_Team_description?: string | null;
					staff_team_id: number;
					staff_team_inactive?: boolean | null;
					staff_team_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					staff_team_abbreviation?: string | null;
					staff_Team_description?: string | null;
					staff_team_id?: number;
					staff_team_inactive?: boolean | null;
					staff_team_name?: string | null;
				};
				Relationships: [];
			};
			status_codes: {
				Row: {
					created_at: string | null;
					status_code_abbreviation: string | null;
					status_code_description: string | null;
					status_code_id: number;
					status_code_inactive: boolean | null;
					status_code_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					status_code_abbreviation?: string | null;
					status_code_description?: string | null;
					status_code_id: number;
					status_code_inactive?: boolean | null;
					status_code_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					status_code_abbreviation?: string | null;
					status_code_description?: string | null;
					status_code_id?: number;
					status_code_inactive?: boolean | null;
					status_code_name?: string | null;
				};
				Relationships: [];
			};
			tasks: {
				Row: {
					created_at: string | null;
					task_description: string | null;
					task_id: number;
					task_inactive: boolean | null;
					task_name: string | null;
					task_name_abbreviation: string | null;
				};
				Insert: {
					created_at?: string | null;
					task_description?: string | null;
					task_id: number;
					task_inactive?: boolean | null;
					task_name?: string | null;
					task_name_abbreviation?: string | null;
				};
				Update: {
					created_at?: string | null;
					task_description?: string | null;
					task_id?: number;
					task_inactive?: boolean | null;
					task_name?: string | null;
					task_name_abbreviation?: string | null;
				};
				Relationships: [];
			};
			tax_rates: {
				Row: {
					created_at: string | null;
					tax_rate_abbreviation: string | null;
					tax_rate_description: string | null;
					tax_rate_id: number;
					tax_rate_inactive: boolean | null;
					tax_rate_name: string | null;
					tax_rate_percent: string | null;
				};
				Insert: {
					created_at?: string | null;
					tax_rate_abbreviation?: string | null;
					tax_rate_description?: string | null;
					tax_rate_id: number;
					tax_rate_inactive?: boolean | null;
					tax_rate_name?: string | null;
					tax_rate_percent?: string | null;
				};
				Update: {
					created_at?: string | null;
					tax_rate_abbreviation?: string | null;
					tax_rate_description?: string | null;
					tax_rate_id?: number;
					tax_rate_inactive?: boolean | null;
					tax_rate_name?: string | null;
					tax_rate_percent?: string | null;
				};
				Relationships: [];
			};
			team_roles: {
				Row: {
					created_at: string | null;
					team_role_abbreviation: string | null;
					team_role_description: string | null;
					team_role_id: number;
					team_role_inactive: boolean | null;
					team_role_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					team_role_abbreviation?: string | null;
					team_role_description?: string | null;
					team_role_id: number;
					team_role_inactive?: boolean | null;
					team_role_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					team_role_abbreviation?: string | null;
					team_role_description?: string | null;
					team_role_id?: number;
					team_role_inactive?: boolean | null;
					team_role_name?: string | null;
				};
				Relationships: [];
			};
			tier: {
				Row: {
					created_at: string | null;
					tier_abbreviation: string | null;
					tier_description: string | null;
					tier_id: number;
					tier_inactive: boolean | null;
					tier_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					tier_abbreviation?: string | null;
					tier_description?: string | null;
					tier_id: number;
					tier_inactive?: boolean | null;
					tier_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					tier_abbreviation?: string | null;
					tier_description?: string | null;
					tier_id?: number;
					tier_inactive?: boolean | null;
					tier_name?: string | null;
				};
				Relationships: [];
			};
			timesheet_rows: {
				Row: {
					created_at: string;
					date: string | null;
					id: number;
					job_id: number | null;
					not_chargeable: boolean | null;
					notes: string;
					rate: number;
					staff_id: number | null;
					task_id: number | null;
					time: number;
					unsubmitted: boolean | null;
				};
				Insert: {
					created_at?: string;
					date?: string | null;
					id?: number;
					job_id?: number | null;
					not_chargeable?: boolean | null;
					notes: string;
					rate?: number;
					staff_id?: number | null;
					task_id?: number | null;
					time: number;
					unsubmitted?: boolean | null;
				};
				Update: {
					created_at?: string;
					date?: string | null;
					id?: number;
					job_id?: number | null;
					not_chargeable?: boolean | null;
					notes?: string;
					rate?: number;
					staff_id?: number | null;
					task_id?: number | null;
					time?: number;
					unsubmitted?: boolean | null;
				};
				Relationships: [
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "jobs";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_currency_status_type_join";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_team_client_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view_v2";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "timesheet_jobsresponse_dropdown";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_staff_id_fkey";
						columns: ["staff_id"];
						referencedRelation: "wolfgangers";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "timesheet_rows_staff_id_fkey";
						columns: ["staff_id"];
						referencedRelation: "user_dept_join";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "timesheet_rows_staff_id_fkey";
						columns: ["staff_id"];
						referencedRelation: "user_dept_join_v2";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "timesheet_rows_task_id_fkey";
						columns: ["task_id"];
						referencedRelation: "tasks";
						referencedColumns: ["task_id"];
					}
				];
			};
			user_roles: {
				Row: {
					created_at: string | null;
					user_role_abbreviation: string | null;
					user_role_description: string | null;
					user_role_id: number;
					user_role_inactive: boolean | null;
					user_role_name: string | null;
				};
				Insert: {
					created_at?: string | null;
					user_role_abbreviation?: string | null;
					user_role_description?: string | null;
					user_role_id: number;
					user_role_inactive?: boolean | null;
					user_role_name?: string | null;
				};
				Update: {
					created_at?: string | null;
					user_role_abbreviation?: string | null;
					user_role_description?: string | null;
					user_role_id?: number;
					user_role_inactive?: boolean | null;
					user_role_name?: string | null;
				};
				Relationships: [];
			};
			user_task_assign: {
				Row: {
					created_at: string;
					id: number;
					job_task_id: number | null;
					user_id: number | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					job_task_id?: number | null;
					user_id?: number | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					job_task_id?: number | null;
					user_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "user_task_assign_job_task_id_fkey";
						columns: ["job_task_id"];
						referencedRelation: "job_tasks";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_task_assign_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "wolfgangers";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "user_task_assign_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "user_dept_join";
						referencedColumns: ["user_id"];
					},
					{
						foreignKeyName: "user_task_assign_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "user_dept_join_v2";
						referencedColumns: ["user_id"];
					}
				];
			};
			wolfgangers: {
				Row: {
					user_department: number | null;
					user_email: string | null;
					user_id: number;
					user_job_rate_1: number;
					user_job_rate_2: number;
					user_job_rate_3: number;
					user_job_rate_4: number;
					user_job_rate_5: number;
					user_name: string | null;
					user_role: string | null;
					user_status: string | null;
				};
				Insert: {
					user_department?: number | null;
					user_email?: string | null;
					user_id: number;
					user_job_rate_1?: number;
					user_job_rate_2?: number;
					user_job_rate_3?: number;
					user_job_rate_4?: number;
					user_job_rate_5?: number;
					user_name?: string | null;
					user_role?: string | null;
					user_status?: string | null;
				};
				Update: {
					user_department?: number | null;
					user_email?: string | null;
					user_id?: number;
					user_job_rate_1?: number;
					user_job_rate_2?: number;
					user_job_rate_3?: number;
					user_job_rate_4?: number;
					user_job_rate_5?: number;
					user_name?: string | null;
					user_role?: string | null;
					user_status?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "wolfgangers_user_department_fkey";
						columns: ["user_department"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					}
				];
			};
		};
		Views: {
			job_client_currency_status_type_join: {
				Row: {
					client_name: string | null;
					currency_symbol: string | null;
					job_id: number | null;
					job_name: string | null;
					job_type_name: string | null;
					status_code_name: string | null;
				};
				Relationships: [];
			};
			job_client_view: {
				Row: {
					client_name: string | null;
					department_name: string | null;
					job_currency_id: number | null;
					job_current_status: number | null;
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_tier_id: number | null;
					job_type: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_current_status_fkey";
						columns: ["job_current_status"];
						referencedRelation: "status_codes";
						referencedColumns: ["status_code_id"];
					},
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					},
					{
						foreignKeyName: "jobs_job_type_fkey";
						columns: ["job_type"];
						referencedRelation: "job_type";
						referencedColumns: ["job_type_id"];
					}
				];
			};
			job_client_wolfganger_view: {
				Row: {
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_tier_id: number | null;
					job_type_name: string | null;
					name: string | null;
					team_lead: boolean | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					}
				];
			};
			job_client_wolfganger_view_v4: {
				Row: {
					client_name: string | null;
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_tier_id: number | null;
					job_type_name: string | null;
					team_lead: boolean | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					}
				];
			};
			job_list_header: {
				Row: {
					client_name: string | null;
					count: number | null;
				};
				Relationships: [];
			};
			job_team_client_view_v4: {
				Row: {
					client_name: string | null;
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_tier_id: number | null;
					job_type_name: string | null;
					team_lead: boolean | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					}
				];
			};
			job_teamlead_and_poc_view: {
				Row: {
					client_name: string | null;
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_tier_id: number | null;
					job_type_name: string | null;
					poc: boolean | null;
					team_lead: boolean | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					}
				];
			};
			job_teamlead_and_poc_view_v2: {
				Row: {
					client_name: string | null;
					job_department_id: number | null;
					job_id: number | null;
					job_name: string | null;
					job_start_date: string | null;
					job_tier_id: number | null;
					job_type_name: string | null;
					poc: boolean | null;
					team_lead: boolean | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "jobs_job_department_id_fkey";
						columns: ["job_department_id"];
						referencedRelation: "department";
						referencedColumns: ["department_id"];
					},
					{
						foreignKeyName: "jobs_job_tier_id_fkey";
						columns: ["job_tier_id"];
						referencedRelation: "tier";
						referencedColumns: ["tier_id"];
					}
				];
			};
			jobonly_task_view: {
				Row: {
					job_name: string | null;
				};
				Relationships: [];
			};
			timesheet_jobsresponse_dropdown: {
				Row: {
					client_name: string | null;
					job_id: number | null;
					job_name: string | null;
				};
				Relationships: [];
			};
			timesheet_rows_byuser: {
				Row: {
					client_name: string | null;
					date: string | null;
					job_name: string | null;
					not_chargeable: boolean | null;
					notes: string | null;
					task_name: string | null;
					time: number | null;
					user_name: string | null;
				};
				Relationships: [];
			};
			timesheet_rows_byuser_v2: {
				Row: {
					client_name: string | null;
					date: string | null;
					job_name: string | null;
					not_chargeable: boolean | null;
					notes: string | null;
					task_name: string | null;
					time: number | null;
					user_name: string | null;
				};
				Relationships: [];
			};
			timesheet_rows_byuser_v3: {
				Row: {
					client_name: string | null;
					date: string | null;
					job_id: number | null;
					job_name: string | null;
					not_chargeable: boolean | null;
					notes: string | null;
					task_name: string | null;
					time: number | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "jobs";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_currency_status_type_join";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_team_client_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view_v2";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "timesheet_jobsresponse_dropdown";
						referencedColumns: ["job_id"];
					}
				];
			};
			timesheet_rows_byuser_v4: {
				Row: {
					client_name: string | null;
					date: string | null;
					id: number | null;
					job_id: number | null;
					job_name: string | null;
					not_chargeable: boolean | null;
					notes: string | null;
					rate: number | null;
					task_name: string | null;
					time: number | null;
					user_name: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "jobs";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_currency_status_type_join";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_client_wolfganger_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_team_client_view_v4";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "job_teamlead_and_poc_view_v2";
						referencedColumns: ["job_id"];
					},
					{
						foreignKeyName: "timesheet_rows_job_id_fkey";
						columns: ["job_id"];
						referencedRelation: "timesheet_jobsresponse_dropdown";
						referencedColumns: ["job_id"];
					}
				];
			};
			user_dept_join: {
				Row: {
					department_name: string | null;
					user_email: string | null;
					user_id: number | null;
					user_name: string | null;
				};
				Relationships: [];
			};
			user_dept_join_v2: {
				Row: {
					department_name: string | null;
					user_email: string | null;
					user_id: number | null;
					user_job_rate_1: number | null;
					user_job_rate_2: number | null;
					user_job_rate_3: number | null;
					user_job_rate_4: number | null;
					user_job_rate_5: number | null;
					user_name: string | null;
				};
				Relationships: [];
			};
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			continents:
				| "Africa"
				| "Antarctica"
				| "Asia"
				| "Europe"
				| "Oceania"
				| "North America"
				| "South America";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
