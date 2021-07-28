import React from 'react';
import { useEffect } from 'react';
import cityApi from 'api/citiApi';
import { Route, Switch } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    cityApi.getAll().then(response => console.log(response))
  }, [])

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <>
    <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>

    <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>

        <PrivateRoute path='/admin'>
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
    </Switch>
    </>
  );
}

export default App;
