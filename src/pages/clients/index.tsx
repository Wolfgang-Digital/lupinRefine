import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  TextField,
  Typography,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Container,
  CssBaseline,
  Paper,
  styled,
  Slide,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

// Import the Supabase client
import supabase from "../../config/supaBaseClient";
import CustomTable from 'src/components/ClientFinancialsTable';


// Transition of dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ClientDetailProps {
  client: Client; // Use the Client interface
  onClose: () => void; // Callback to close the dialog
}

interface Client {
  client_id: number;
  client_name: string;
  client_legal_name: string | null;
  client_tier: string;
  country: string;
  zip: string;
  [key: string]: string | number | null;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ client, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [clientInfo, setClientInfo] = useState<Client>({
    client_id: client.client_id,
    client_name: client.client_name,
    client_legal_name: client.client_legal_name,
    client_tier: client.client_tier,
    country: client.country,
    zip: client.zip,
    // ... Initialize other fields
  });

  const clientInfoFields = [
    { label: 'Client Name', field: 'client_name' },
    { label: 'Client ID', field: 'client_id' },
    { label: 'Client Legal Name', field: 'client_legal_name' },
    { label: 'Tier', field: 'client_tier' },
    // ... Add more fields
  ];

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ style: { marginLeft: '10%', width: '90%' } }} // Adjust padding here
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {client.client_name}
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
  
      {/* Tabs */}
      <div style={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Client Tabs">
          <Tab label="Client Info" />
          <Tab label="Financials" />
          {/* ... Other tabs */}
        </Tabs>
      </div>
  
      {/* Tab Content */}
      <div style={{ width: '100%' }}>
      <div role="tabpanel" hidden={tabValue !== 0} id={`tabpanel-0`} aria-labelledby={`tab-0`} style={{ paddingTop: '40px', paddingBottom: '90px' }}>
  
          {/* Client Info Tab Content */}
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <Typography component="h1" variant="h5">
                Edit Client Info
              </Typography>
              <form>
                {clientInfoFields.map((field) => (
                  <TextField
                    key={field.field}
                    margin="normal"
                    fullWidth
                    label={field.label}
                    value={clientInfo[field.field]}
                    onChange={(e) => handleClientInfoChange(field.field, e.target.value)}
                  />
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Save Changes
                </Button>
              </form>
            </Paper>
          </Container>
        </div>
        
        <div role="tabpanel" hidden={tabValue !== 1} id={`tabpanel-1`} aria-labelledby={`tab-1`} style={{ paddingTop: '60px', paddingBottom:"90px" }}>
          {/* Financials Tab Content */}
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Paper elevation={3} >
              <Typography sx={{ paddingLeft: '20px', paddingTop: "10px"}} variant="h5" component="div">
                Client: {client.client_name}
              </Typography>
              <Typography sx={{ paddingLeft: '20px', paddingTop: "10px", paddingBottom:"10px"}} variant="h6" component="div">
                Job: Google Ads
              </Typography>
              <CustomTable/>
            </Paper>
          </Container>
        </div>
        {/* ... Content for other tabs */}
      </div>
    </Dialog>
  );
};

const ClientOverview: React.FC = () => {
  const [clients, setClients] = useState<any[] | []>([]); // Use the Client type
  const [selectedClient, setSelectedClient] = useState<any | null>(null); // Use the Client type
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data, error } = await supabase.from('client').select('*, wolfgangers (user_id, user_name), currency (currency_id, currency_symbol), tier (tier_id, tier_name)').order('client_id', { ascending: true });
        if (error) {
          console.error('Error fetching clients:', error);
          return;
        }
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }

    fetchClients();
  }, []);

  const handleClientClick = (params: any) => {
    setSelectedClient(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClient(null);
  };

  const HoverableCell = styled('div')({
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out', // Add a smooth transition
    '&:hover': {
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
  });

  const columns = [
    { field: 'client_id', headerName: 'ID', width: 100 },
    {
      field: 'client_name',
      headerName: 'NAME',
      width: 250,
      renderCell: (params: any) => (
        <HoverableCell onClick={() => handleClientClick(params)}>{params.value}</HoverableCell>
      ),
    },
    { field: 'client_legal_name', headerName: 'LEGAL NAME', width: 250 },
    { field: 'client_tier', headerName: 'TIER', width: 200 },
    { field: 'team_lead', headerName: 'TEAM LEAD', width: 200 },
    // ... Other columns
  ];
  const rows = clients.map((client) => ({
    client_id: client.client_id,
    client_name: client.client_name,
    client_legal_name: client.client_legal_name,
    client_tier: client.client_tier,
  }))

  return (
    <div style={{ height: 750, width: '100%', marginBottom: '100px' }}>
      <Typography gutterBottom variant="h5" component="div">
        Client Overview
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '10px' }}>
        <Button
          size="small"
          variant="contained"
          style={{ fontSize: '12px', padding: '6px 12px', marginRight: '10px' }}
        >
          Add New Client
        </Button>
        <Button
          size="small"
          variant="outlined"
          style={{ fontSize: '12px', padding: '6px 12px', marginRight: '10px' }}
        >
          Bulk Actions
        </Button>
        <TextField size="small" id="search" type="search" label="Search" sx={{ width: 200, height: 30 }} />
        <FormControlLabel
          control={<Checkbox />}
          label="Include inactive / Completed projects"
          style={{ marginLeft: '5px', marginRight: '5px' }}
        />
        <FormControlLabel control={<Checkbox />} label="Display current only" />
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        getRowId={(row: any) => row.client_id} // Use the 'client_id' property as the id
        onCellClick={(params: any) => {
          if (params.field === 'client_name') {
            handleClientClick(params);
          }
        }}
      />

      {selectedClient && <ClientDetail client={selectedClient} onClose={handleCloseDialog} />}
    </div>
  );
};

export default ClientOverview;
function handleClientInfoChange(field: string, value: string): void {
  throw new Error('Function not implemented.');
}