import { Grid, Paper, Button, Typography } from '@mui/material';
import React from 'react';

const timesheet = () => {
  return (
    <>
      <h1>Timesheet</h1>
      <div>
        <Grid container spacing={2}>
          {/* First column */}
          <Grid item xs={6}>
            <Paper>
              {/* Content for the first column */}
              Column 1
            </Paper>
          </Grid>

          {/* Second column */}
          <Grid item xs={6}>
            <Paper style={{ textAlign: 'center', padding: '80px' }}>
              {/* Content for the second column */}

              <Button variant="contained" color="primary" style={{ padding: '10px' }}>
                Add Time
              </Button>

              <Typography variant="body1" style={{ padding: '30px' }}>
              Start Tracking Time.
              </Typography>
              <Typography variant="body1" style={{ padding: '20px' }}>
              Clicking the Add Time button will create New time entries which you'll be able to review or edit in your daily view.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default timesheet;
