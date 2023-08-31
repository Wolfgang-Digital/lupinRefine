function getCookieValue(cookieString, cookieName) {
	const cookies = cookieString.split(';').map((cookie) => cookie.trim());
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === cookieName) {
			return decodeURIComponent(value);
		}
	}
	return null; // Cookie not found
}

export default (req, res) => {
	// get cookie value from request params
	const cookies = req.headers.cookie || '';
	const { site } = req.query;

	const cookieName = '__Secure-next-auth.session-token';
	const cookieValue = getCookieValue(cookies, cookieName);

	// Convert the filteredCookies object into a query string
	// Now you have the cookies turned into a query string
	res.redirect(`${site}/api/setCookies?cookieValue=${cookieValue}}`);
};
