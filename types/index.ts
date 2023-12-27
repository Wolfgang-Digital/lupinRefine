import { Database } from "types/supabase";
export type Tables = Database["public"]["Tables"];
export type Views = Database["public"]["Views"];
export type AllocateHours = Tables["allocate_hours"]["Row"];
export type Client = Tables["client"]["Row"];
export type Currency = Tables["currency"]["Row"];
export type Users = Tables["users"]["Row"];
export type Tasks = Tables["tasks"]["Row"];
export type Tier = Tables["tier"]["Row"];
export type Job = Tables["jobs"]["Row"];
export type Country = Tables["countries"]["Row"];
export type ClientOverview = Views["client_overview"]["Row"];
export type UsersOverview = Views["user_dept_join"]["Row"];
export type TimesheetRowsView = Views["timesheet_rows_view"]["Row"];
export type MonthlyTimesheetRowsView =
	Views["monthly_timesheet_rows_view"]["Row"];
export type JobTask = Tables["job_tasks"]["Row"];
export type AllocateHoursView = Views["allocate_hours_view"]["Row"];
export type GetAllJobsWithProjects =
	Views["jobs_overview_with_projects"]["Row"];
export type ProjectJobTasksView = Views["project_job_task_view"]["Row"];
export type JobNames = Tables["job_names"]["Row"];
export type ProjectJobsView = Views["project_jobs_view"]["Row"];
export type GetAllJobsWithProjects2 =
	Views["jobs_overview_with_projects_2"]["Row"];
export type ClientsWithJobs = Views["clients_with_jobs"]["Row"];
