import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLogin } from "@refinedev/core";
import { ThemedTitle } from "src/components";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	body: {
		backgroundColor: "#02786D",
		height: "100vh",
		overflow: "hidden", // Prevent overscroll
		display: "flex",
		flexDirection: "column", // Center content vertically
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		paddingBottom: "60px", // Adjusted padding
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		display: "flex",
		flexDirection: "row", // Changed to column layout
		justifyContent: "center",
		alignItems: "center",
		gap: "24px", // Adjusted gap between logo and boxes
	},
	box: {
		minHeight: "80px",
		minWidth: "250px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		border: "1px solid #ccc",
		borderRadius: "10px",
		padding: "24px",
		gap: "24px",
		backgroundColor: "#fff",
	},
	link: {
		textDecoration: "none",
	},
});

export default function Login() {
	const classes = useStyles();
	const { mutate: login } = useLogin();

	return (
		<div className={classes.body}>
			<Box className={classes.logo}>
				<img
					src="https://www.wolfgangdigital.com/img/logo.svg"
					alt="Wolfgang Digital Logo"
					style={{ width: "250px" }}
				/>
			</Box>
			<Container className={classes.container}>
				{/* First Box */}
				<Box className={classes.box} onClick={() => login({})}>
					<ThemedTitle
						collapsed={false}
						wrapperStyles={{
							fontSize: "18px",
							justifyContent: "center",
						}}
					/>
				</Box>
				{/* Second Box with Link */}
				<Link
					className={classes.link}
					href="https://analytics.wolfgangdigital.com/"
				>
					<Box className={classes.box}>
						<ThemedTitle
							collapsed={false}
							wrapperStyles={{
								fontSize: "18px",
								justifyContent: "center",
							}}
							text="ANALYTICS"
							disabled
						/>
					</Box>
				</Link>
			</Container>
		</div>
	);
}

Login.noLayout = true;
