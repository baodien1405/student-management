# Mini Project - Student Management

/login
layout: /admin

/admin/\*
feature: /admin/dashboard
feature: /admin/student

auth

- login
- sign up / register
- forget password

CLICK LOGIN

- Call API to login
- Success => redirect ADMIN
- Failed => show ERROR

LOGIN
LOOUT

authSaga
LOOP

- if logged in, watch LOGOUT
- else watch LOGIN

LOGIN

- call login API to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT

- clear token from local storage
- redirect to login page

authSlice
authSaga
