import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles(theme => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1)
  }
}));

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City
  };
  onEdit?: (student: Student) => void,
  onRemove?: (student: Student) => void,
}

export default function StudentTable({studentList, cityMap, onEdit, onRemove}: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectesStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectesStudent(student);
    setOpen(true);
  }

  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">{student.mark}</Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button className={classes.edit} color="primary" size="small" onClick={() => onEdit?.(student)}>Edit</Button>
                  <Button color="secondary" size="small" onClick={() => handleRemoveClick(student)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove a student with named "{selectedStudent?.name}". This can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
