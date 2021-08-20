import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { FC, useState } from 'react';

interface Props {
  open: boolean;
  onEnter: (nickname: string) => void;
  onCancel: () => void;
}

const EnterRoomModal: FC<Props> = ({ open, onEnter, onCancel }) => {
  const [nickname, setNickname] = useState('');

  const onChange = (e: any) => {
    const value = e.target.value;

    setNickname(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Enter the room</DialogTitle>
      <DialogContent style={{ width: '400px', height: '64px' }}>
        <TextField
          autoFocus
          required
          id="nickname"
          name="nickname"
          label="Nickname"
          onChange={onChange}
          value={nickname}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onEnter(nickname);
            setNickname('');
          }}
        >
          Enter
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnterRoomModal;
