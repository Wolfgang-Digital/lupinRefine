import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import supabase from "src/config/supaBaseClient";

type RowData = {
  id: number;
  month: string;
  job: string;
  task: string;
  staff: string;
  hours: number;
  rate: number;
  value: number;
  budgetToInvoice: number;
  invoiced: number;
  balRemaining: number;
  balanced: boolean;
};

function createData(
  id: number,
  month: string,
  job: string,
  task: string,
  staff: string,
  hours: number,
  rate: number,
  value: number,
  budgetToInvoice: number,
  invoiced: number,
  balRemaining: number,
  balanced: boolean
): RowData {
  return {
    id,
    month,
    job,
    task,
    staff,
    hours,
    rate,
    value,
    budgetToInvoice,
    invoiced,
    balRemaining,
    balanced,
  };
}

const columns = [
  { field: 'job', headerName: 'Job', width: 150 },
  { field: 'task', headerName: 'Task', width: 150 },
  { field: 'staff', headerName: 'Staff', width: 100 },
  { field: 'hours', headerName: 'Hours', width: 100 },
  { field: 'rate', headerName: 'Rate', width: 100 },
  { field: 'value', headerName: 'Value', width: 100 },
  { field: 'budgetToInvoice', headerName: 'Budget to Invoice', width: 150 },
  { field: 'invoiced', headerName: 'Invoiced', width: 120 },
  { field: 'balRemaining', headerName: 'Bal Remaining', width: 150 },
  { field: 'balanced', headerName: 'Balanced', width: 120, type: 'boolean' },
];

const rows: RowData[] = [
  // January
  createData(1, 'January', 'SEO Optimization', 'Keyword Research', 'Alice', 10, 40, 400, 200, 250, 200, true),
  createData(2, 'January', 'Social Media', 'Content Creation', 'Bob', 12, 35, 420, 180, 200, 180, false),

  // February
  createData(3, 'February', 'Email Marketing', 'Campaign Design', 'Carol', 8, 45, 360, 150, 180, 150, true),
  createData(4, 'February', 'Content Strategy', 'Blogging', 'David', 15, 50, 750, 250, 300, 250, false),

  // March
  createData(5, 'March', 'PPC Advertising', 'Ad Copywriting', 'Alice', 6, 55, 330, 120, 150, 120, false),
  createData(6, 'March', 'Social Media', 'Engagement', 'Bob', 10, 40, 400, 180, 200, 180, true),

  // April
  createData(7, 'April', 'SEO Optimization', 'Backlink Building', 'Carol', 8, 45, 360, 150, 180, 150, false),
  createData(8, 'April', 'Email Marketing', 'Newsletter Campaign', 'David', 12, 35, 420, 200, 220, 200, true),

  // May
  createData(9, 'May', 'Content Strategy', 'Infographic Creation', 'Alice', 10, 40, 400, 180, 200, 180, false),
  createData(10, 'May', 'PPC Advertising', 'Keyword Research', 'Bob', 8, 45, 360, 150, 180, 150, true),

  // June
  createData(11, 'June', 'Social Media', 'Ad Campaigns', 'Carol', 15, 50, 750, 250, 300, 250, false),
  createData(12, 'June', 'SEO Optimization', 'Site Audit', 'David', 6, 55, 330, 120, 150, 120, true),

  // July
  createData(13, 'July', 'Email Marketing', 'Automation Setup', 'Alice', 12, 35, 420, 200, 220, 200, false),
  createData(14, 'July', 'Content Strategy', 'Whitepaper Writing', 'Bob', 10, 40, 400, 180, 200, 180, true),

  // August
  createData(15, 'August', 'PPC Advertising', 'Ad Campaigns', 'Carol', 8, 45, 360, 150, 180, 150, false),
  createData(16, 'August', 'Social Media', 'Influencer Outreach', 'David', 15, 50, 750, 250, 300, 250, true),

  // September
  createData(17, 'September', 'SEO Optimization', 'Content Audit', 'Alice', 10, 40, 400, 180, 200, 180, false),
  createData(18, 'September', 'Email Marketing', 'Segmentation', 'Bob', 6, 55, 330, 120, 150, 120, true),

  // October
  createData(19, 'October', 'Content Strategy', 'Video Production', 'Carol', 12, 35, 420, 200, 220, 200, false),
  createData(20, 'October', 'PPC Advertising', 'Ad Copywriting', 'David', 8, 45, 360, 150, 180, 150, true),

  // November
  createData(21, 'November', 'Social Media', 'Social Listening', 'Alice', 15, 50, 750, 250, 300, 250, false),
  createData(22, 'November', 'SEO Optimization', 'On-Page SEO', 'Bob', 10, 40, 400, 180, 200, 180, true),

  // December
  createData(23, 'December', 'Email Marketing', 'Lead Nurturing', 'Carol', 6, 55, 330, 120, 150, 120, false),
  createData(24, 'December', 'Content Strategy', 'Content Calendar', 'David', 12, 35, 420, 200, 220, 200, true),
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CollapsibleGrid() {
  const groupedRows: { [key: string]: RowData[] } = {};

  // Group the rows by month
  rows.forEach((row) => {
    if (!groupedRows[row.month]) {
      groupedRows[row.month] = [];
    }
    groupedRows[row.month].push(row);
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      {Object.keys(groupedRows).map((month) => (
        <Accordion key={month}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{month}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper>
              <DataGrid
                rows={groupedRows[month]}
                columns={columns.map((col) => ({
                  ...col,
                  editable: true, // Set all columns as editable
                }))}
                components={{
                  Toolbar: CustomToolbar,
                }}
                hideFooter
                autoHeight
              />
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default CollapsibleGrid;





