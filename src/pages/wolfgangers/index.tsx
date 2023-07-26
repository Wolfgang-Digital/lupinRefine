import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import supabase from "../../config/supaBaseClient";

type Wolfganger = {
  user_id: number,
  user_name: string,
  user_email: string,
  department_name: string,
}

const wolfgangers = () => {
  const [fetchError, setFetchError] = useState("");
  const [wolfgangers, setWolfgangers] = useState<Wolfganger[] | []>([]);

  useEffect(() => {
    const fetchWolfgangers = async () => {
      const {data, error} = await supabase.from('user_dept_join').select()

      if (error) {
        setFetchError('Could not fetch the users');
        setWolfgangers([]);
        console.log(error);
      }
      if (data) {
        setWolfgangers(data);
        setFetchError("");
      }
    }
    fetchWolfgangers();
  }, [])

  const columns = [
    { field: 'user_id', headerName: 'ID', width: 200 },
    { field: 'user_name', headerName: 'Name', width: 200 },
    { field: 'user_email', headerName: 'Email', width: 300 },
    { field: 'user_department', headerName: 'Department', width: 300 },
  ];

  const rows = wolfgangers.map((wolfganger) => ({
    user_id: wolfganger.user_id,
    user_name: wolfganger.user_name,
    user_email: wolfganger.user_email,
    user_department: wolfganger.department_name,
}));

function generateRandom() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

console.log(wolfgangers);
return (
  <div style={{ height: '100vh', width: '100%' }}>
    <Typography gutterBottom variant="h4" component="div">
      Wolfgangers
    </Typography>
    <DataGrid rows={rows} columns={columns} getRowId={(row: any) => generateRandom()} checkboxSelection />
    
  </div>
)

}

export default wolfgangers

