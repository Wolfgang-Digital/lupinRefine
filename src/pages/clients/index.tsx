import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import clients from 'src/data/clients.json'

// const users = [
//   { id: 1, name: 'Abbey Seals', legalname: 'Abbey Seals International Ltd', address: 'Unit B1, Nangor Road Business Park, Nangor Road', county: 'Dublin', country: 'Ireland' },
//   { id: 2, name: 'Aura Leisure', legalname: 'Tabula Rasa Ltd t/a Aura Leisure', address: 'Unit A Mount Pleasant Business Park, Ranelagh', county: 'Dublin', country: 'Ireland' },
//   { id: 3, name: 'Best Western', legalname: 'B-W International Licensing Inc', address: 'Citylink Business Park, Old Naas Road', county: 'Dublin', country: 'Ireland' },
//   { id: 4, name: 'Blueface', legalname: 'Blueface Limited', address: 'North Dock Two, 93/94 North Wall Quay', county: 'Dublin', country: 'Ireland' },
//   { id: 5, name: 'Chartered Surveyors', legalname: 'Society of Chartered Surveyors Ireland', address: '38 Merrion Square, Dublin 2', county: 'Dublin', country: 'Ireland' },
//   { id: 6, name: 'Concern', legalname: 'Concern Worldwide', address: '52-55 Lower Camden Street', county: 'Dublin', country: 'Ireland' },
//   { id: 7, name: 'Cross Rental', legalname: 'Cross Rental Services', address: '11 Broomhill Road, Tallaght', county: 'Dublin', country: 'Ireland' },
//   { id: 8, name: 'Dalata', legalname: 'Dalata Hotel Group', address: '4th Floor Burton Court, Sandyford Industrial Estate', county: 'Dublin', country: 'Ireland' },
//   { id: 9, name: 'Dubarry', legalname: 'Dubarry Shoes', address: 'Glentaun', county: 'Galway', country: 'Ireland' },
//   { id: 10, name: 'Elverys', legalname: 'Staunton Sports Ltd T/A Intersport Elverys', address: 'Moneenbradagh Industrial Estate, Castlebar', county: 'Mayo', country: 'Ireland' },
//   { id: 11, name: 'Eurieka IT Services', legalname: 'Eurieka IT Services Limited', address: 'Unit B19 Ballymount Corporate Park, Ballymount', county: 'Dublin', country: 'Ireland' },
//   { id: 12, name: 'Fanuc Europe', legalname: 'Fanuc Europe Corporation', address: '7 Rue Benedikt Zender, Ecternach', county: ' ', country: 'Luxembourg' },
//   { id: 13, name: 'Finca Skin Organics', legalname: 'Finca Skin Organics Limited', address: 'Loughanmore House, Jenkinstown, Dundalk', county: 'Louth', country: 'Ireland' },
//   { id: 14, name: 'Fitzwilliam Capital', legalname: 'Fitzwilliam Capital', address: 'Fitzwilliam Group, Balmoral, Navan', county: 'Meath', country: 'Ireland' },
//   { id: 15, name: 'Gallagher (formerly Innovu Insurance)', legalname: 'Gallagher Insurance', address: 'The Arc, Drinagh', county: 'Wexford', country: 'Ireland' },
//   { id: 16, name: 'Homeland', legalname: 'Aurivo Agribusiness', address: 'Aurivo House, Finisklin Business Park', county: 'Sligo', country: 'Ireland' },
//   { id: 17, name: 'Le Cordon Bleu London', legalname: ':Le Cordon Bleu London', address: '15 Bloomsbury Square, London', county: '', country: 'United Kingdom' },
//   { id: 18, name: 'Leigh Day Solicitors', legalname: 'Leigh Day Solicitors', address: 'www.leighday.co.uk', county: '', country: 'United Kingdom' },
//   { id: 19, name: 'McElhinney\'s', legalname: 'McElhinney\'s', address: 'Main Street, Ballybofey', county: 'Donegal', country: 'Ireland' },
//   { id: 20, name: 'Motor Data Limited', legalname: 'Motor Data Limited', address: 'Kemp House, 160 City Road, London', county: '', country: 'United Kingdom' },
//   { id: 21, name: 'O\'Callaghan Collection', legalname: 'Persian Properties T/A O\'Callaghan Collection', address: 'Hospitality House, 16-20 Cumberland Street', county: 'Dublin', country: 'Ireland' },
//   { id: 22, name: 'Paul Byron Shoes', legalname: 'Byron Distribution Limited', address: 'Golf Links Road, Roscommon Town', county: 'Roscommon', country: 'Ireland' },
//   { id: 23, name: 'Swimlane', legalname: 'Swimlane', address: '363 Centennial Parkway, Suite 210, Louisville', county: '', country: 'United States' },
// ];


const columns: GridColDef[] = [
  { field: 'SystemId', headerName: 'SystemId', width: 200 },
  { field: 'Nm', headerName: 'Name', width: 300 },
  { field: 'ClientID', headerName: 'ClientID', width: 200 },
  { field: 'City', headerName: 'City', width: 200 },
  { field: 'Country', headerName: 'Country', width: 200 },
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
              Client List
          </Typography>
          <DataGrid rows={clients} columns={columns} getRowId={(row: any) =>  generateRandom()} checkboxSelection />
        </div>

    )
}

export default wolfgangers

