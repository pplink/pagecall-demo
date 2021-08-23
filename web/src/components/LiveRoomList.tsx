import React, { FC } from 'react';
import styled from 'styled-components';
import { LiveRoom } from '../models/room';
import LiveRoomSlot from './LiveRoomSlot';

const LiveRoomListBlock = styled.div`
  height: 100%;
`;

interface Props {
  rooms: LiveRoom[];
}

const LiveRoomList: FC<Props> = ({ rooms }) => {
  return (
    <LiveRoomListBlock>
      {rooms.map((room) => (
        <LiveRoomSlot key={room.id} room={room} />
      ))}
    </LiveRoomListBlock>
  );
};

export default LiveRoomList;
