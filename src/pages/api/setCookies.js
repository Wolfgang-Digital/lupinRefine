import { serialize } from 'cookie';

export default (req, res) => {
	// get cookie value from request params
	const { cookieValue } = req.query;
	const cookieString = serialize(
		'__Secure-next-auth.session-token',
		encodeURIComponent(cookieValue),
		{
			httpOnly: true,
			secure: true,
			sameSite: 'none', // Adjust this if needed based on your requirements
			path: '/', // Adjust the path attribute if needed
		}
	);

	res.setHeader('Set-Cookie', cookieString);

	// Now, the query parameters have been turned into cookies with their values
	res.status(200).send('Cookies set successfully');
};
