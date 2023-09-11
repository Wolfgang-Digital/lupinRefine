import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Users } from "types";
import { getAllUsers, UsersData } from "@api/users";
import { useRouter } from "next/router";

const Wolfgangers: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UsersData[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await getAllUsers();
      if (usersResponse) {
        setUsers(usersResponse);
      }
    };
    fetchUsers();
    // console.log(users);
  }, []);

  const columns = [
    { field: "name", headerName: "User Name", width: 200 },
    { field: "department", headerName: "User Department", width: 200 },
    { field: "email", headerName: "User Email", width: 300 },
    { field: "job_rate_1", headerName: "Job Rate #1", width: 150 },
    { field: "job_rate_2", headerName: "Job Rate #2", width: 150 },
    { field: "job_rate_3", headerName: "Job Rate #3", width: 150 },
    { field: "job_rate_4", headerName: "Job Rate #4", width: 150 },
    { field: "job_rate_5", headerName: "Job Rate #5", width: 150 },
  ];

  const rows = users.map((user) => ({
    id: user.user_id,
    name: user.user_name,
    email: user.user_email,
    department: user.department_name,
    job_rate_1: `€` + user.user_job_rate_1,
    job_rate_2: `€` + user.user_job_rate_2,
    job_rate_3: `€` + user.user_job_rate_3,
    job_rate_4: `€` + user.user_job_rate_4,
    job_rate_5: `€` + user.user_job_rate_5,
  }));
  console.log(rows);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Typography gutterBottom variant="h4" component="div">
        Wolfgangers
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
      />
    </div>
  );
};

export default Wolfgangers;
