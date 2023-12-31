import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLogin } from "@refinedev/core";
import { ThemedTitle } from "src/components";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		gap: "64px",
	},
	box: {
		minHeight: "250px",
		minWidth: "250px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		border: "1px solid #ccc",
		borderRadius: "4px",
		padding: "24px",
		gap: "24px",
	},
	link: {
		textDecoration: "none",
	},
});

export default function Login() {
	const classes = useStyles();
	const { mutate: login } = useLogin();

	return (
		<Container className={classes.container}>
			<Box className={classes.box} onClick={() => login({})}>
				<ThemedTitle
					collapsed={false}
					wrapperStyles={{
						fontSize: "22px",
						justifyContent: "center",
					}}
				/>
			</Box>
			<Link className={classes.link} href="https://analytics.wolfgangdigital.com/">
				<Box className={classes.box}>
					<ThemedTitle
						collapsed={false}
						wrapperStyles={{
							fontSize: "22px",
							justifyContent: "center",
						}}
						text="ANALYTICS"
						disabled
					/>
				</Box>
			</Link>
		</Container>
	);
}

Login.noLayout = true;
