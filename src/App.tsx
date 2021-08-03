import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Redirect from="/" to="/admin/dashboard" exact />

      <Route path="/login">
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
