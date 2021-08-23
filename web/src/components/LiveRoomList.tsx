import React, { FC } from 'react';
import styled from 'styled-components';
import { Room } from '../models/room';
import LiveRoomSlot from './LiveRoomSlot';

const LiveMeetingPageBlock = styled.div`
  height: 100%;
`;

interface Props {
  rooms: Room[];
}

const LiveRoomList: FC<Props> = ({ rooms }) => {
  return (
    <LiveMeetingPageBlock>
      {rooms.map((room) => (
        <LiveRoomSlot key={room.id} room={room} />
      ))}
    </LiveMeetingPageBlock>
  );
};

export default LiveRoomList;
