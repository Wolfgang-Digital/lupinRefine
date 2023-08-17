import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import jobs from 'src/data/jobs.json'


const columns: GridColDef[] = [
  { field: 'DisplayName', headerName: 'Name', width: 300 },
  { field: 'TypeId', headerName: 'Type', width: 200  },
  { field: 'PrimaryContactId', headerName: 'Team Leads', width: 200  },
  { field: 'ProjectCode', headerName: 'Job Number', width: 200  }
];

function generateRandom() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const jobList = () => {
    return (
        <div style={{ height: '160vh!important', width: '100%' }}>
          <Typography gutterBottom variant="h6" component="div">
              Job List
          </Typography>
          <DataGrid rows={jobs} columns={columns} getRowId={(row: any) =>  generateRandom()} />
        </div>

    )
}

export default jobList

