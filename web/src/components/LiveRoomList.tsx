import React from 'react';
import styled from 'styled-components';
import { Room } from '../models/room';
import LiveRoomSlot from './LiveRoomSlot';

const LiveMeetingPageBlock = styled.div`
  height: 100%;
`;

const mocks: Room[] = [
  {
    id: '1',
    name: '써니',
    pcaRoomId: 'seonny',
    start: new Date(),
    end: null,
    participant: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: '피터',
    pcaRoomId: 'peter',
    start: new Date(),
    end: null,
    participant: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: '제리',
    pcaRoomId: 'jerry',
    start: new Date(),
    end: null,
    participant: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const LiveRoomList = () => {
  return (
    <LiveMeetingPageBlock>
      {mocks.map((room) => (
        <LiveRoomSlot key={room.id} room={room} />
      ))}
    </LiveMeetingPageBlock>
  );
};

export default LiveRoomList;
