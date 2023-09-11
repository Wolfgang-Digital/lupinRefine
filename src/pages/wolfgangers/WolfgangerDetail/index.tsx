import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Container,
  CssBaseline,
  Paper,
  Slide,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { UserData } from "@api/users";
import { UsersOverview } from "types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserDetailProps {
  user: UserData;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const userInfoFields: { label: string; field: keyof UsersOverview }[] = [
    { label: "User Name", field: "user_name" },
    { label: "Department", field: "department_name" },
    { label: "Email", field: "user_email" },
    { label: "Job Rate #1", field: "user_job_rate_1" },
    { label: "Job Rate #2", field: "user_job_rate_2" },
    { label: "Job Rate #3", field: "user_job_rate_3" },
    { label: "Job Rate #4", field: "user_job_rate_4" },
    { label: "Job Rate #5", field: "user_job_rate_5" },
  ];

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`${user?.user_name}`}
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      {/* Tabs */}
      <div style={{ width: "100%" }}>
        <Tabs
          value={tabValue || 0}
          onChange={handleTabChange}
          aria-label="User Tabs"
        >
          <Tab label="User Info" />
        </Tabs>
      </div>

      <div style={{ width: "100%" }}>
        <div
          role="tabpanel"
          hidden={tabValue !== 0}
          id={`tabpanel-0`}
          aria-labelledby={`tab-0`}
          style={{ paddingTop: "40px", paddingBottom: "90px" }}
        >
          {/* User Info Tab Content */}
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Paper elevation={3} sx={{ padding: "20px" }}>
              <Typography component="h1" variant="h5">
                Edit Wolfganger Info
              </Typography>
              <form>
                {userInfoFields.map((field) => (
                  <TextField
                    key={field?.field}
                    margin="normal"
                    fullWidth
                    label={field.label}
                    value={user?.[field.field] || ""}
                  />
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Save Changes
                </Button>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </Dialog>
  );
};

export default UserDetail;
