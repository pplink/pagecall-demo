import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { FC } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const CloseRoomModal: FC<Props> = ({ open, onClose, onCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Close the room</DialogTitle>
      <DialogContent style={{ width: '400px', height: '64px' }}>
        <DialogContentText>
          Are you sure you want to close the room? All users in room will leave.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Close
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseRoomModal;
