import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function ForgotPassword() {
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0); // 0: Enter PIN, 1: Reset Password

  const handleForgotPasswordStepChange = (step) => {
    setForgotPasswordStep(step);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <Typography variant="h5" className="text-center mb-6">
          Forgot Password
        </Typography>

        {/* Forgot Password Form */}
        {forgotPasswordStep === 0 && (
          <form>
            <div className="mb-4">
              <TextField
                label="Enter PIN Sent to Your Email"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleForgotPasswordStepChange(1)} // Move to Reset Password step
            >
              Verify PIN
            </Button>
          </form>
        )}

        {forgotPasswordStep === 1 && (
          <form>
            <div className="mb-4">
              <TextField
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                required
              />
            </div>

            <div className="mb-4">
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
