import React, { FC } from 'react';
import styled from 'styled-components';
import { ClosedRoom } from '../models/room';
import ClosedRoomSlot from './ClosedRoomSlot';

const ClosedRoomListBlock = styled.div`
  height: 100%;
`;

interface Props {
  rooms: ClosedRoom[];
}

const ClosedRoomList: FC<Props> = ({ rooms }) => {
  return (
    <ClosedRoomListBlock>
      {rooms.map((room) => (
        <ClosedRoomSlot key={room.id} room={room} />
      ))}
    </ClosedRoomListBlock>
  );
};

export default ClosedRoomList;
