import { useState } from 'react';
import { Tab, Tabs, TextField, Button, Typography, Link, IconButton } from '@mui/material';
import axios from 'axios';

import { Visibility, VisibilityOff } from '@mui/icons-material';


function loginUser(event) {
    event.preventDefault(); // Prevent default form submission

    console.log('attempting login');
    console.log(event.target);

    const email = event.target[0].value;
    const password = event.target[2].value;

    console.log(email, password);

    axios.post('/auth/login', { email, password })
    .then(function (res) {
        if (res.status === 200) { 
            console.log('Login Successful');
            window.location.replace('/content'); 
        }
    })
    .catch(function (error) { console.log('Error logging in:', error);});
}

async function registerUser(event) {
  event.preventDefault();

  const email = event.target[0].value;
  const pwd1 = event.target[2].value;
  const pwd2 = event.target[5].value;

  if( pwd1 === pwd2) {
    console.log('Passwords are matching');
  }
  else {
    console.log('Passwords do not match, cannot create account');
    return;
  }

  axios.post('/auth/register', { email: email, password: pwd1 })
  .then(function (response) { console.log(`Response: ${response}. \nUser succesfully registered`); window.location.replace('/auth');})
  .catch( function (error) { console.log(`Error in Registration: ${error}`)});

}



function Auth() {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // For login password
  const [showSignUpPassword, setShowSignUpPassword] = useState(false); // For sign-up passwords

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <Typography variant="h5" className="text-center mb-6">
          {activeTab === 0 ? 'Login' : 'Sign Up'}
        </Typography>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Login Form */}
        {activeTab === 0 && (
          <form onSubmit={loginUser}>
            <div className="mb-4">
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                required
                id="emailid"
              />
            </div>

            <div className="mb-4">
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                required
                id="pwd"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <div className="mb-4 flex justify-between items-center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === 1 && (
          <form onSubmit={registerUser}>
            <div className="mb-4">
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                required
                name="email"
              />
            </div>

            <div className="mb-4">
              <TextField
                label="Password"
                type={showSignUpPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                required
                name="pwd1"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowSignUpPassword((prev) => !prev)}
                    >
                      {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <div className="mb-4">
              <TextField
                label="Confirm Password"
                type={showSignUpPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                required
                name="pwd2"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowSignUpPassword((prev) => !prev)}
                    >
                      {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
        )}

        <div className="mt-4 text-center">
          {activeTab === 0 && (
            <Link href="/resetpwd" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


export default Auth;
