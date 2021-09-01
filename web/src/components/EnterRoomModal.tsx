import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { LiveRoom } from '../models';

interface Props {
  open: boolean;
  room: LiveRoom;
  onCancel: () => void;
}

const EnterRoomModal: FC<Props> = ({ open, room, onCancel }) => {
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    setNickname('');
  }, [open]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }, []);

  const onEnter = useCallback(() => {
    onCancel();
    window.open(`/rooms/${room.id}?nickname=${nickname}`, '_blank');
  }, [nickname, onCancel, room]);

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
        <Button variant="outlined" color="primary" onClick={onEnter}>
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
