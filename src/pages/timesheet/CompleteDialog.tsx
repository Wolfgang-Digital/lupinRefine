import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

export const CompleteDialog = ({
	handleClose,
	handleConfirm,
	open,
	inUncompleting = false,
}: {
	handleClose: () => void;
	handleConfirm: (isUncompleting: boolean) => void;
	open: boolean;
	inUncompleting?: boolean;
}) => {
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>
				Are you sure you want to {inUncompleting && "un"}complete the task?
			</DialogTitle>
			<Button variant="contained" onClick={() => handleConfirm(inUncompleting)}>
				Confirm
			</Button>
			<Button
				variant="contained"
				onClick={handleClose}
				style={{
					marginTop: "10px",
				}}
			>
				Cancel
			</Button>
		</Dialog>
	);
};
