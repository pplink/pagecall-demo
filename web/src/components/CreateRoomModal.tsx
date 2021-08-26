import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useRoomsDispatch } from '../contexts/RoomsContext';
import { request } from '../helpers';
import { LiveRoom } from '../models';

interface Props {
  open: boolean;
  onCancel: () => void;
}

const CreateRoomModal: FC<Props> = ({ open, onCancel }) => {
  const [name, setName] = useState('');

  const roomsDispatch = useRoomsDispatch();

  useEffect(() => {
    setName('');
  }, [open]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onCreate = useCallback(() => {
    request
      .post<{ room: LiveRoom }>('rooms', {
        name,
      })
      .then(({ room }) => {
        roomsDispatch({ type: 'CREATE_ROOM', room });
        onCancel();
      })
      .catch((e) => console.error(e));
  }, [name, onCancel, roomsDispatch]);

  return (
    <Dialog open={open}>
      <DialogTitle>Create a room</DialogTitle>
      <DialogContent style={{ width: '400px', height: '64px' }}>
        <TextField
          autoFocus
          required
          name="name"
          label="Room name"
          onChange={onChange}
          value={name}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onCreate}>
          Create
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
