import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import supabase from "../../config/supaBaseClient";

type Client = {
  client_id: number,
  client_name: string,
  address_line1: string,
  client_city: string,
  client_country: string,
}

const clients = () => {
  const [fetchError, setFetchError] = useState("")
  const [clients, setClients] = useState<Client[] | []>([])

  useEffect(() => {
    const fetchClients = async () => {
      const {data, error} = await supabase.from('client').select()

      if (error) {
        setFetchError('Could not fetch the Clients');
        setClients([]);
        console.log(error)
      }
      if (data) {
        setClients(data);
        setFetchError("")
      }
    }
    fetchClients()
  }, []);

  const columns = [
    { field: 'client_id', headerName: 'ID', width: 200 },
    { field: 'client_name', headerName: 'Client', width: 300 },
    { field: 'address_line1', headerName: 'Address Line 1', width: 200 },
    { field: 'client_city', headerName: 'City', width: 200 },
    { field: 'client_country', headerName: 'Country', width: 200 },
  ];

  const rows = clients.map((client) => ({
    client_id: client.client_id,
    client_name: client.client_name,
    address_line1: client.address_line1,
    client_city: client.client_city,
    client_country: client.client_country,
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

console.log(clients);
return (
  <div style={{ height: '100vh', width: '100%' }}>
    <Typography gutterBottom variant="h4" component="div">
      Clients
    </Typography>
    <DataGrid rows={rows} columns={columns} getRowId={(row: any) => generateRandom()} checkboxSelection />
  </div>
)

}

export default clients

