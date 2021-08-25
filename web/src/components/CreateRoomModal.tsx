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

interface Props {
  open: boolean;
  onCreate: (name: string) => void;
  onCancel: () => void;
}

const CreateRoomModal: FC<Props> = ({ open, onCreate, onCancel }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName('');
  }, [open]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onCreate(name);
          }}
        >
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
