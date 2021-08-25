import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import { ClosedRoom, LiveRoom } from '../models/room';
import EnterRoomModal from './EnterRoomModal';
import CloseRoomModal from './CloseRoomModal';
import { formatDate, request } from '../helpers';
import { useRoomsDispatch } from '../contexts/RoomsContext';
import { useCallback } from 'react';

const LiveRoomSlotBlock = styled.div`
  background: white;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  room: LiveRoom;
}

const LiveRoomSlot: FC<Props> = ({ room }) => {
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const roomsDispatch = useRoomsDispatch();

  const onEnter = useCallback(() => {
    setIsEnterModalOpen(true);
  }, []);

  const onEnterInEnterModal = useCallback(
    (nickname: string) => {
      setIsEnterModalOpen(false);
      window.open(`/rooms/${room.id}?nickname=${nickname}`, '_blank');
    },
    [room],
  );

  const onCancelInEnterModal = useCallback(() => {
    setIsEnterModalOpen(false);
  }, []);

  const onClose = useCallback(() => {
    setIsCloseModalOpen(true);
  }, []);

  const onCloseInCloseModal = useCallback(() => {
    request
      .put<{ room: ClosedRoom }>(`/rooms/${room.id}`, {})
      .then(({ room }) => roomsDispatch({ type: 'CLOSE_ROOM', room }));
    setIsCloseModalOpen(false);
  }, [room, roomsDispatch]);

  const onCancelInCloseModal = useCallback(() => {
    setIsCloseModalOpen(false);
  }, []);

  return (
    <>
      <LiveRoomSlotBlock>
        <div>
          <h2>{room.name}</h2>
          <p>Created at {formatDate(new Date(room.start))}</p>
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: '5px' }}
            onClick={onEnter}
          >
            Enter
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </LiveRoomSlotBlock>
      <EnterRoomModal
        open={isEnterModalOpen}
        onEnter={onEnterInEnterModal}
        onCancel={onCancelInEnterModal}
      />
      <CloseRoomModal
        open={isCloseModalOpen}
        onClose={onCloseInCloseModal}
        onCancel={onCancelInCloseModal}
      />
    </>
  );
};

export default LiveRoomSlot;
