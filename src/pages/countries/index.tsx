import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllCountries } from '@api/countries';
import { Country } from 'types';

const countries = () => {
	const [fetchError, setFetchError] = useState('');
	const [countries, setCountries] = useState<Country[] | []>([]);

	useEffect(() => {
		const fetchCountries = async () => {
			const countriesResponse = await getAllCountries();

			if (countriesResponse) {
				setCountries(countriesResponse);
				console.log(fetchError);
				setFetchError('');
			}
		};
		fetchCountries();
	}, []);

	const columns: (GridColDef & { field: keyof Country })[] = [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'name', headerName: 'Country', width: 200 },
		{ field: 'iso2', headerName: 'ISO2', width: 300 },
	];

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<Typography gutterBottom variant='h4' component='div'>
				Countries
			</Typography>
			<DataGrid
				rows={countries}
				columns={columns}
				getRowId={(row: Country) => row.id}
				checkboxSelection
			/>
		</div>
	);
};

export default countries;
