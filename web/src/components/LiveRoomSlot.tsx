import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import { Room } from '../models/room';
import EnterRoomModal from './EnterRoomModal';
import CloseRoomModal from './CloseRoomModal';

const LiveRoomSlotBlock = styled.div`
  background: white;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  room: Room;
}

const LiveRoomSlot: FC<Props> = ({ room }) => {
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const onEnter = () => {
    setIsEnterModalOpen(true);
  };

  const onEnterInEnterModal = (nickname: string) => {
    setIsEnterModalOpen(false);
  };

  const onCancelInEnterModal = () => {
    setIsEnterModalOpen(false);
  };

  const onClose = () => {
    setIsCloseModalOpen(true);
  };

  const onCloseInCloseModal = () => {
    setIsCloseModalOpen(false);
  };

  const onCancelInCloseModal = () => {
    setIsCloseModalOpen(false);
  };

  return (
    <>
      <LiveRoomSlotBlock>
        <div>
          <h2>{room.name}</h2>
          <p>Created at {room.start.toISOString()}</p>
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
