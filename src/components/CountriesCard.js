import React from 'react';

const CountryCard = ({ country }) => {
	return (
		<div className='smoothie-card'>
			<h3>{country.name}</h3>
			<p>{country.iso2}</p>
			<div className='rating'>{country.iso3}</div>
		</div>
	);
};

export default CountryCard;
