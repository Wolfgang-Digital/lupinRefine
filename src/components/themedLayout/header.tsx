import React from "react";
import { pickNotDeprecated } from "@refinedev/core";
import { useSession } from "next-auth/react";

import { HamburgerMenu } from "./hamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
	isSticky,
	sticky,
}) => {
	const { data: session } = useSession();
	const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;
	const user = session?.user || {};
	return (
		<AppBar position={prefferedSticky ? "sticky" : "relative"}>
			<Toolbar>
				<HamburgerMenu />
				<Stack
					direction="row"
					width="100%"
					justifyContent="flex-end"
					alignItems="center"
				>
					<Stack
						direction="row"
						gap="16px"
						alignItems="center"
						justifyContent="center"
					>
						<Typography
							sx={{
								display: { xs: "none", md: "block" },
							}}
							variant="subtitle2"
						>
							{user?.name}
						</Typography>
						<Avatar src={user?.image || ""} alt={user?.name || ""} />
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
