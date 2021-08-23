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
  onCreate: (name: string) => void;
  onCancel: () => void;
}

const CreateRoomModal: FC<Props> = ({ open, onCreate, onCancel }) => {
  const [name, setName] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

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
            setName('');
          }}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            onCancel();
            setName('');
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
