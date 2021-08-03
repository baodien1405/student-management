import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`
  }
}))

export interface StatisticItemProps {
  icon: ReactElement;
  value: string | number;
  label: string;
}

export default function StatisticItem ({icon, value, label}: StatisticItemProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
