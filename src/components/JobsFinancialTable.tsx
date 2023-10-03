// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import EditIcon from "@mui/icons-material/Edit";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// function Row() {
// 	const [openJanuary, setOpenJanuary] = useState(false);
// 	const [openFebruary, setOpenFebruary] = useState(false);

// 	return (
// 		<>
// 			<TableRow
// 				style={{
// 					backgroundColor: "#3a2462",
// 					color: "white",
// 					padding: "0px!important",
// 				}}
// 			>
// 				<TableCell>
// 					<IconButton
// 						aria-label="expand row"
// 						size="small"
// 						style={{ color: "white", padding: "0px" }}
// 						onClick={() => setOpenJanuary(!openJanuary)}
// 					>
// 						January
// 						{openJanuary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 					</IconButton>
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					28
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					148
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4148
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					21.5
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					151
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					3248
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4448
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4448
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					3248
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					1200
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 			</TableRow>
// 			<TableRow>
// 				<TableCell
// 					style={{ paddingBottom: 0, paddingTop: 0, margin: 0 }}
// 					colSpan={16}
// 				>
// 					<Collapse in={openJanuary} timeout="auto" unmountOnExit>
// 						<Box sx={{ margin: 0, padding: 0 }}>
// 							{/* TABLE 1 */}
// 							<Table size="small">
// 								<TableBody>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 130,
// 												backgroundColor: "#D9D9D9",
// 												color: "black",
// 												margin: 0,
// 											}}
// 											align="left"
// 										>
// 											<span>- Management</span>
// 											<span
// 												style={{
// 													paddingLeft: "26%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "18.5%",
// 												}}
// 											>
// 												548
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "7.6%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "7.4%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "5.2%",
// 												}}
// 											>
// 												548
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "6%",
// 												}}
// 											>
// 												600
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 220,
// 											}}
// 											align="left"
// 										>
// 											<span>- Opt</span>
// 											<span
// 												style={{
// 													paddingLeft: "25.5%",
// 												}}
// 											>
// 												775
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "20.5%",
// 												}}
// 											>
// 												325
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jack</span>

// 											<span style={{ paddingLeft: "4%" }}>1</span>

// 											<span style={{ paddingLeft: "5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.8%" }}>0.5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.6%" }}>75</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>George</span>

// 											<span style={{ paddingLeft: "2.7%" }}>5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>125</span>

// 											<span style={{ paddingLeft: "3.9%" }}>625</span>

// 											<span style={{ paddingLeft: "5%" }}>2</span>

// 											<span style={{ paddingLeft: "5.3%" }}>125</span>

// 											<span style={{ paddingLeft: "4.4%" }}>250</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 225,
// 											}}
// 											align="left"
// 										>
// 											<span>- Reporting</span>
// 											<span
// 												style={{
// 													paddingLeft: "21.2%",
// 												}}
// 											>
// 												150
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "21.8%",
// 												}}
// 											>
// 												0
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jack</span>

// 											<span style={{ paddingLeft: "4%" }}>1</span>

// 											<span style={{ paddingLeft: "5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.5%" }}>0</span>

// 											<span style={{ paddingLeft: "5.8%" }}>150</span>

// 											<span style={{ paddingLeft: "5.2%" }}>0</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: "18%",
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<AddCircleOutlineIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 								</TableBody>
// 							</Table>

// 							{/* TABLE 2 */}
// 							<Table size="small">
// 								<TableBody>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 130,
// 												backgroundColor: "#D9D9D9",
// 												color: "black",
// 												margin: 0,
// 											}}
// 											align="left"
// 										>
// 											<span>- CRO</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 220,
// 											}}
// 											align="left"
// 										>
// 											<span>- Audit</span>
// 											<span
// 												style={{
// 													paddingLeft: "24.1%",
// 												}}
// 											>
// 												1500
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "20.2%",
// 												}}
// 											>
// 												1500
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jordan</span>

// 											<span style={{ paddingLeft: "3%" }}>1</span>

// 											<span style={{ paddingLeft: "4.5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.8%" }}>0.5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.6%" }}>75</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 225,
// 											}}
// 											align="left"
// 										>
// 											<span>- Landing Page</span>
// 											<span
// 												style={{
// 													paddingLeft: "18.5%",
// 												}}
// 											>
// 												600
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "21%",
// 												}}
// 											>
// 												750
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jordan</span>

// 											<span style={{ paddingLeft: "3%" }}>1</span>

// 											<span style={{ paddingLeft: "4.5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.5%" }}>0</span>

// 											<span style={{ paddingLeft: "5.8%" }}>150</span>

// 											<span style={{ paddingLeft: "5.2%" }}>0</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: "18%",
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<AddCircleOutlineIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>

// 			{/* NEW MONTH */}

// 			<TableRow
// 				style={{
// 					backgroundColor: "#3a2462",
// 					color: "white",
// 				}}
// 			>
// 				<TableCell>
// 					<IconButton
// 						aria-label="expand row"
// 						size="small"
// 						style={{ color: "white", padding: "0px" }}
// 						onClick={() => setOpenFebruary(!openFebruary)}
// 					>
// 						February
// 						{openFebruary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 					</IconButton>
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					28
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					148
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4148
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					21.5
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					151
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					3248
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4448
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					4448
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					3248
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center">
// 					1200
// 				</TableCell>
// 				<TableCell style={{ color: "white" }} align="center"></TableCell>
// 			</TableRow>
// 			<TableRow>
// 				<TableCell
// 					style={{ paddingBottom: 0, paddingTop: 0, margin: 0 }}
// 					colSpan={16}
// 				>
// 					<Collapse in={openFebruary} timeout="auto" unmountOnExit>
// 						<Box sx={{ margin: 0, padding: 0 }}>
// 							{/* TABLE 1 */}
// 							<Table size="small">
// 								<TableBody>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 130,
// 												backgroundColor: "#D9D9D9",
// 												color: "black",
// 												margin: 0,
// 											}}
// 											align="left"
// 										>
// 											<span>- Management</span>
// 											<span
// 												style={{
// 													paddingLeft: "26%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "18.5%",
// 												}}
// 											>
// 												548
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "7.6%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "7.4%",
// 												}}
// 											>
// 												1148
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "5.2%",
// 												}}
// 											>
// 												548
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "6%",
// 												}}
// 											>
// 												600
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 220,
// 											}}
// 											align="left"
// 										>
// 											<span>- Opt</span>
// 											<span
// 												style={{
// 													paddingLeft: "25.5%",
// 												}}
// 											>
// 												775
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "20.5%",
// 												}}
// 											>
// 												325
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jack</span>

// 											<span style={{ paddingLeft: "4%" }}>1</span>

// 											<span style={{ paddingLeft: "5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.8%" }}>0.5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.6%" }}>75</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>George</span>

// 											<span style={{ paddingLeft: "2.7%" }}>5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>125</span>

// 											<span style={{ paddingLeft: "3.9%" }}>625</span>

// 											<span style={{ paddingLeft: "5%" }}>2</span>

// 											<span style={{ paddingLeft: "5.3%" }}>125</span>

// 											<span style={{ paddingLeft: "4.4%" }}>250</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 225,
// 											}}
// 											align="left"
// 										>
// 											<span>- Reporting</span>
// 											<span
// 												style={{
// 													paddingLeft: "21.2%",
// 												}}
// 											>
// 												150
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "21.8%",
// 												}}
// 											>
// 												0
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jack</span>

// 											<span style={{ paddingLeft: "4%" }}>1</span>

// 											<span style={{ paddingLeft: "5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.5%" }}>0</span>

// 											<span style={{ paddingLeft: "5.8%" }}>150</span>

// 											<span style={{ paddingLeft: "5.2%" }}>0</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: "18%",
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<AddCircleOutlineIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 								</TableBody>
// 							</Table>

// 							{/* TABLE 2 */}
// 							<Table size="small">
// 								<TableBody>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 130,
// 												backgroundColor: "#D9D9D9",
// 												color: "black",
// 												margin: 0,
// 											}}
// 											align="left"
// 										>
// 											<span>- CR0</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 220,
// 											}}
// 											align="left"
// 										>
// 											<span>- Audit</span>
// 											<span
// 												style={{
// 													paddingLeft: "24.1%",
// 												}}
// 											>
// 												1500
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "20.2%",
// 												}}
// 											>
// 												1500
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jordan</span>

// 											<span style={{ paddingLeft: "3%" }}>1</span>

// 											<span style={{ paddingLeft: "4.5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.8%" }}>0.5</span>

// 											<span style={{ paddingLeft: "4.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.6%" }}>75</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 225,
// 											}}
// 											align="left"
// 										>
// 											<span>- Landing Page</span>
// 											<span
// 												style={{
// 													paddingLeft: "18.5%",
// 												}}
// 											>
// 												600
// 											</span>
// 											<span
// 												style={{
// 													paddingLeft: "21%",
// 												}}
// 											>
// 												750
// 											</span>
// 										</TableCell>
// 									</TableRow>

// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 0,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<EditIcon style={{ fontSize: "medium" }} />
// 											</span>
// 											<span style={{ paddingLeft: "22%" }}>Jordan</span>

// 											<span style={{ paddingLeft: "3%" }}>1</span>

// 											<span style={{ paddingLeft: "4.5%" }}>150</span>

// 											<span style={{ paddingLeft: "3.8%" }}>150</span>

// 											<span style={{ paddingLeft: "4.5%" }}>0</span>

// 											<span style={{ paddingLeft: "5.8%" }}>150</span>

// 											<span style={{ paddingLeft: "5.2%" }}>0</span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: 100,
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 220 }}>
// 												<PersonAddAltIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 									<TableRow>
// 										<TableCell
// 											style={{
// 												paddingLeft: "18%",
// 											}}
// 											align="left"
// 										>
// 											<span style={{ paddingLeft: 0 }}>
// 												<AddCircleOutlineIcon style={{ fontSize: "medium" }} />
// 											</span>

// 											<span style={{ paddingLeft: "2.5%" }}></span>

// 											<span style={{ paddingLeft: "5%" }}></span>

// 											<span style={{ paddingLeft: "3.9%" }}></span>

// 											<span style={{ paddingLeft: "4.8%" }}></span>

// 											<span style={{ paddingLeft: "5.5%" }}></span>

// 											<span style={{ paddingLeft: "5.2%" }}></span>
// 										</TableCell>
// 									</TableRow>
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>
// 		</>
// 	);
// }

// function JobsFinancialTable() {
// 	return (
// 		<TableContainer
// 			component={Paper}
// 			style={{
// 				paddingTop: "20px",
// 			}}
// 		>
// 			<span
// 				style={{
// 					paddingLeft: "33%",
// 				}}
// 			>
// 				Allocated
// 			</span>
// 			<span
// 				style={{
// 					paddingLeft: "13%",
// 				}}
// 			>
// 				Actuals
// 			</span>

// 			<Table aria-label="collapsible table">
// 				<TableHead>
// 					<TableRow>
// 						{/* Add the 'task', 'subtask', and 'staff' headers */}
// 						<TableCell align="left">Month</TableCell>
// 						<TableCell align="left">Task</TableCell>
// 						<TableCell align="center">Subtask</TableCell>
// 						<TableCell align="center">Staff</TableCell>
// 						<TableCell align="center">Hours</TableCell>
// 						<TableCell align="center">Rate</TableCell>
// 						<TableCell align="center">Value</TableCell>
// 						<TableCell align="center">Hours2</TableCell>
// 						<TableCell align="center">Rate2</TableCell>
// 						<TableCell align="center">Value2</TableCell>
// 						<TableCell align="center">Bdgt To Invoice</TableCell>
// 						<TableCell align="center">Invoiced</TableCell>
// 						<TableCell align="center">Used</TableCell>
// 						<TableCell align="center">Bal Remain</TableCell>
// 						<TableCell align="center">Bal</TableCell>
// 					</TableRow>
// 				</TableHead>
// 				<TableBody>
// 					<Row />
// 				</TableBody>
// 			</Table>
// 		</TableContainer>
// 	);
// }

// export default JobsFinancialTable;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system"; // Import styled for custom styling

// Define your column headers
const columns = [
	"Month",
	"Task",
	"Sub Task",
	"Staff",
	"Hours",
	"Rate",
	"Value",
	"Hours",
	"Rate",
	"Value",
	"Bdgt to Invoice",
	"Invoiced",
	"Used",
	"Bal Remain",
	"Bal",
];

// Define your data
const data = [
	[
		"January",
		"",
		"",
		"",
		"28",
		"148",
		"4148",
		"21.5",
		"151",
		"3248",
		"4448",
		"4448",
		"3248",
		"1200",
		"",
	],
];

// Fake data for the expanded sub-table
const subTableData = [
	[
		"",
		"Management", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"1148",
		"",
		"",
		"548",
		"",
		"",
		"",
		"",
		"No",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"- Opt", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"775",
		"",
		"",
		"325",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0.5",
		"150",
		"75",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"George",
		"5",
		"125",
		"625",
		"2",
		"125",
		"250",
		"",
		"",
		"",
		"",
		"",
	],

	[
		"",
		"", // Empty cell for Task 1
		"- Reporting", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"150",
		"",
		"",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0",
		"150",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"CRO", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"2100",
		"",
		"",
		"2250",
		"",
		"",
		"",
		"",
		"No",
	],
	// ... other data rows
];

// Define custom styles using the styled function
const TableCellNoPadding = styled(TableCell)({
	padding: 0, // Remove the default padding
});

function JobsFinancialTable() {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<TableContainer component={Paper}>
			<Table style={{ minWidth: "100%" }} aria-label="custom table">
				<TableHead>
					<TableRow>
						{columns.map((column, columnIndex) => (
							<TableCellNoPadding
								key={column}
								style={{
									textAlign: "center",
									cursor: columnIndex === 0 ? "pointer" : "auto",
									width: "7%",
								}}
								onClick={columnIndex === 0 ? toggleExpansion : undefined}
							>
								{column}
							</TableCellNoPadding>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, rowIndex) => (
						<React.Fragment key={`row-${rowIndex}`}>
							<TableRow>
								{row.map((cell, cellIndex) => (
									<TableCellNoPadding
										key={`cell-${rowIndex}-${cellIndex}`}
										style={{ textAlign: "center", width: "7%" }}
									>
										{cellIndex === 0 && rowIndex === 0 ? (
											<span style={{ cursor: "pointer" }} onClick={toggleExpansion}>
												{cell}
											</span>
										) : (
											cell
										)}
									</TableCellNoPadding>
								))}
							</TableRow>
							{isExpanded && rowIndex === 0 && (
								<TableRow>
									<TableCellNoPadding colSpan={15}>
										{/* Sub-table for Additional Data */}
										<Table style={{ minWidth: "100%" }}>
											<TableBody>
												{subTableData.map((subRow, subRowIndex) => (
													<TableRow
														key={`sub-row-${subRowIndex}`}
														style={{ padding: 0 }} // Remove padding
													>
														{subRow.map((subCell, subCellIndex) => (
															<TableCellNoPadding
																key={`sub-cell-${subRowIndex}-${subCellIndex}`}
																style={{
																	textAlign: "center",
																	width: "7%",
																}}
															>
																{subCell}
															</TableCellNoPadding>
														))}
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableCellNoPadding>
								</TableRow>
							)}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default JobsFinancialTable;
