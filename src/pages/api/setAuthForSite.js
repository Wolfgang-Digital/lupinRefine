import querystring from 'querystring';

const cookieArray = [
	'next-auth.session-token',
	'next-auth.callback-url',
	'next-auth.csrf-token',
	'__Secure-next-auth.session-token',
	'__Secure-next-auth.callback-url',
	'__Host-next-auth.csrf-token',
];

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
	const filteredCookies = {};
	for (const key of cookieArray) {
		if (parsedCookies[key]) {
			filteredCookies[key] = parsedCookies[key];
		}
	}

	// Convert the filteredCookies object into a query string
	const queryString = querystring.stringify(filteredCookies);
	console.log(queryString);
	// Now you have the cookies turned into a query string
	res.redirect(`${site}/api/setCookies?${queryString}`);
};
