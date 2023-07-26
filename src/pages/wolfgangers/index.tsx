import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import staff from 'src/data/staff.json'

const columns: GridColDef[] = [
  { field: 'Staff Member', headerName: 'Staff Member', width: 200 },
  { field: 'Department', headerName: 'Department', width: 200 },
  { field: 'Email', headerName: 'Email', width: 300 },
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

const wolfgangers = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
          <Typography gutterBottom variant="h4" component="div">
              Wolfgangers
          </Typography>
          <DataGrid rows={staff} columns={columns} getRowId={(row: any) =>  generateRandom()} checkboxSelection />
        </div>

    )
}

export default wolfgangers

