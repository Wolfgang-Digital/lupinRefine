import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import supabase from "../../config/supaBaseClient";

// components
//import CountriesCard from "../../components/CountriesCard";

type Country = {
    id: number,
    name: string,
    iso2: string,
    iso3: string,
}

const countries = () => {
    const [fetchError, setFetchError] = useState("")
    const [countries, setCountries] = useState<Country[] | []>([])

    useEffect(() => {
        const fetchCountries = async () => {
            const {data, error} = await supabase.from('countries').select()

            if (error) {
                setFetchError('Could not fetch the countries')
                setCountries([])
                console.log(error)
            }
            if (data) {
                setCountries(data)
                setFetchError("")
            }
        }
        fetchCountries()
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Country', width: 200 },
        { field: 'iso2', headerName: 'ISO2', width: 300 },
      ];

      const rows = countries.map((country) => ({
            id: country.id,
            name: country.name,
            iso2: country.iso2,
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

    console.log(countries);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Typography gutterBottom variant="h4" component="div">
              Countries
          </Typography>
          <DataGrid rows={rows} columns={columns} getRowId={(row: any) =>  generateRandom()} checkboxSelection />
            
        </div>
    )
}

export default countries