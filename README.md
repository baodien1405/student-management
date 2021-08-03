# Mini Project - Student Management
## Setup environment 

Github Project: https://github.com/baodien1405/student-management

## Production Deployment

Website Project: https://student-management-app.vercel.app


### 1. Setup React and Redux App via Create React App using TypeScript

> Link: https://react-redux.js.org/introduction/getting-started


### 2. Add react router 

```
npm i --save react-router-dom @types/react-router-dom
```

### 3. Add UI lib

```
npm i --save @material-ui/core @material-ui/icons @material-ui/lab
```

### 4. Add Form lib

```
npm i --save react-hook-form @hookform/resolvers yup
```

### 5. Add Redux side effect manager

```
npm i --save redux-saga
```


## Tổ chức folder

```
src
|__ app (global state managerment)
|  |__ hooks
|  |__ rootSaga.ts
|  |__ store.ts
|
|__ api (organize api for app)
|  |__ axiosClient.ts
|  |__ cityApi.ts
|  |__ studentApi.ts
|
|__ components (shared components)
|  |__ Common
|  |  |__ Header.tsx
|  |  |__ NotFound.tsx
|  |  |__ PrivateRoute.tsx
|  |  |__ Sidebar.tsx
|  |  |__ index.ts
|  |
|  |__ FormFields
|  |  |__ InputField.tsx
|  |  |__ RadioGroupField.tsx
|  |  |__ SelectField.tsx
|  |  |__ index.ts
|  |
|  |__ Layout
|     |__ Admin.tsx
|     |__ index.ts
|
|__ constants
|
|__ features
|  |__ student
|  |  |__ components
|  |  |  |__ StudentFilters
|  |  |  |__ StudentForm
|  |  |  |__ StudentTable
|  |  |
|  |  |__ pages
|  |  |  |__ AddEditPage
|  |  |  |__ ListPage
|  |  |__ index.tsx
|  |  |__ studentSaga.ts
|  |  |__ studentSlice.ts
|  |
|  |__ auth
|  |  |__ pages
|  |  |   |__ LoginPage.tsx
|  |  |
|  |  |__ authSaga.ts
|  |  |__ authSlice.ts
|  |
|  |__ city
|  |  |__ citySaga.ts
|  |  |__ citySlice.ts
|  |
|  |__ dashboard
|     |__ components
|     |   |__ StatisticItem
|     |   |__ StudentRankingList
|     |   |__ Widget
|     |   
|     |__ index.tsx
|     |__ dashboardSaga.ts
|     |__ dashboardSlice.ts
|
|__ utils (define common function using in App)
|  |__ common.ts
|  |__ history.ts
|  |__ index.ts
|
|__ models
   |__ city.ts
   |__ common.ts
   |__ stdudent.ts
   |__ user.ts
   |__ index.ts
    
```

## Tổ chức routing

- Sử dụng kĩ thuật lazy load components.
- Load theo features.

```js
// App.tsx
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
```
## Custom Field 

- Cầu nối giữa UI control và React Hook Form.
- UI control là một controlled component với props: 
  - name: tên xác định control
  - value: giá trị của control
  - onChange: trigger hàm này với giá trị mới khi có thay đổi
  - onBlur: xác định khi nào thì control này bị touched

```js
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
```
