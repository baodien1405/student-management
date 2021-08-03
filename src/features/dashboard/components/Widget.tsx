import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.2),
    border: `1px solid ${theme.palette.divider}`
  },
  title: {
    display: "block",
    textAlign: "center",
  }
}))

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget ({title, children}: WidgetProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button" className={classes.title}>{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
