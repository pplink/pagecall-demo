import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { useRoomsDispatch } from '../contexts/RoomsContext';
import { request } from '../helpers';
import { ClosedRoom, LiveRoom } from '../models';

interface Props {
  open: boolean;
  room: LiveRoom;
  onCancel: () => void;
}

const CloseRoomModal: FC<Props> = ({ open, room, onCancel }) => {
  const roomsDispatch = useRoomsDispatch();

  const onClose = useCallback(() => {
    request
      .put<{ room: ClosedRoom }>(`/rooms/${room.id}`, {})
      .then(({ room }) => {
        roomsDispatch({ type: 'CLOSE_ROOM', room });
        onCancel();
      });
  }, [onCancel, room, roomsDispatch]);

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
