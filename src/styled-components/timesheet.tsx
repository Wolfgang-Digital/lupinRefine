import styled from "styled-components";
import { Button } from "@mui/material";

export const WeekButton = styled(Button)`
	background-color: #3a2462;
	color: white; // Change text color to white
	&:hover {
		background-color: #3a2462; // Keep the background color the same on hover
	}
`;

export const TimesheetContainer = styled.div`
	display: flex;

	align-items: center;

	padding-bottom: 10px;
`;

export const Container = styled.div`
	display: flex;

	align-items: center;

	padding-bottom: 10px;

	h2 {
		margin-right: 20px;
	}
`;

export const WeekSelectorContainer = styled.div`
	display: flex;

	align-items: center;

	padding-bottom: 20px;

	button {
		background-color: #3a2462;
	}
`;
