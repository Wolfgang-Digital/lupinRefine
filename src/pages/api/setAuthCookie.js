export default (req, res) => {
	// get cookie value from request params
	const { cookie } = req.query;

	res.setHeader(
		'Set-Cookie',
		`__Secure-next-auth.session-token=${cookie}; HttpOnly; Path=/; Expires=${new Date(
			Date.now() + 7 * 24 * 60 * 60 * 1000
		).toUTCString()}`
	);

	// redirect to dashboard url
	res.redirect('/dashboard');
};
