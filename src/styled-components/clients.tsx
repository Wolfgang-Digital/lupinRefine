import styled from "styled-components";
import { Button } from "@mui/material";

export const ClientsContainer = styled.div`
	height: 750;
	width: 100%;
	margin-bottom: 100px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-bottom: 10px;
`;

export const AddNewClientButton = styled(Button)`
	font-size: 12px;
	padding: 6px 12px;
	margin-right: 10px;
	margin-bottom: 10px;
`;

export const TabContainer = styled.div`
	width: 100%;
`;

export const TabContentContainer = styled.div`
	width: 100%;
`;

export const TabPanelContainer = styled.div`
	padding-top: 40px;
	padding-bottom: 90px;
`;
