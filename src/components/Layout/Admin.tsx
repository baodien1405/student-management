import { Box, makeStyles } from '@material-ui/core';
import { Header } from 'components/Common';
import { Sidebar } from 'components/Common/Sidebar';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: "'header header' 'sidebar main'",

    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: "main",
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
  }
}))

export function AdminLayout () {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
