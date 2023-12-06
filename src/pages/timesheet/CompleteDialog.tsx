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
			<Button
				size="medium"
				variant="contained"
				onClick={() => handleConfirm(inUncompleting)}
				style={{ width: "50%", left: "25%", marginTop: "15px" }}
			>
				Confirm
			</Button>
			<Button
				size="medium"
				variant="contained"
				onClick={handleClose}
				style={{
					marginTop: "20px",
					width: "50%",
					left: "25%",
					marginBottom: "40px",
				}}
			>
				Cancel
			</Button>
		</Dialog>
	);
};
