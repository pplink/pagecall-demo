import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { formatDate } from '../helpers';
import { ClosedRoom } from '../models/room';

const ClosedRoomSlotBlock = styled.div`
  background: white;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  room: ClosedRoom;
}

const ClosedRoomSlot: FC<Props> = ({ room }) => {
  return (
    <>
      <ClosedRoomSlotBlock>
        <div>
          <h2>{room.name}</h2>
          <p>Created at {formatDate(new Date(room.start))}</p>
          <p>Terminated at {formatDate(new Date(room.end))}</p>
        </div>
      </ClosedRoomSlotBlock>
    </>
  );
};

export default ClosedRoomSlot;
