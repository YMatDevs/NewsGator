import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function AutohideSnackbar({ msg, duration, handleClick}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={msg}
      />
    </div>
  );
}
