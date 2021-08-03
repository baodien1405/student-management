import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const history = useHistory();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    toast.success('Save student successfully!!!');
    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft />
          Back to students page
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add edit page'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
