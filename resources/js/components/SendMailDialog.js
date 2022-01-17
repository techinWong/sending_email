import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';



export default function SendMailDialog({onFormSubmit}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formSubmit = () => {
      onFormSubmit();
      handleClose();
  }


  return (
    <Box>
      <Button id="send"  variant="contained"  endIcon={<SendIcon />} onClick={handleClickOpen}>
        SEND
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            คุณยืนยันที่จะส่ง Email ฉบับนี้ ใช่หรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button type="submit" onClick={formSubmit} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}