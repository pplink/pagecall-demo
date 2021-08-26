import React from 'react';
import { Button } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import { LiveRoom } from '../models/room';
import { formatDate } from '../helpers';

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
  onEnter: () => void;
  onClose: () => void;
}

const LiveRoomSlot: FC<Props> = ({ room, onEnter, onClose }) => {
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
    </>
  );
};

export default LiveRoomSlot;
