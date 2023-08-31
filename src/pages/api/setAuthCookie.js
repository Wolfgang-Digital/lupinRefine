export default (req, res) => {
	// get cookie value from request params
	const { cookie } = req.query;
	res.setHeader(
		'Set-Cookie',
		`__Secure-next-auth.session-token=${cookie}; HttpOnly; Secure; Path=/; Expires=${new Date(
			Date.now() + 7 * 24 * 60 * 60 * 1000
		).toUTCString()}`
	);

	res.status(200).json({ message: 'Cookie set!' });
};
