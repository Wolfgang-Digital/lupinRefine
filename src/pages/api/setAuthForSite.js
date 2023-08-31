import querystring from 'querystring';

export default (req, res) => {
	// get cookie value from request params
	const cookies = req.headers.cookie || '';
	const { site } = req.query;
	const parsedCookies = {};

	// Split the cookies and store them in the parsedCookies object
	cookies.split(';').forEach((cookie) => {
		const [key, value] = cookie.split('=');
		parsedCookies[key.trim()] = value;
	});

	// Filter cookies by the ones you specified in your cookieArray

	// Convert the filteredCookies object into a query string
	const queryString = querystring.stringify(parsedCookies);
	console.log(queryString);
	// Now you have the cookies turned into a query string
	res.redirect(`${site}/api/setCookies?${queryString}`);
};
