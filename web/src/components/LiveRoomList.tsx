import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { LiveRoom } from '../models/room';
import LiveRoomSlot from './LiveRoomSlot';
import EnterRoomModal from './EnterRoomModal';
import CloseRoomModal from './CloseRoomModal';

const LiveRoomListBlock = styled.div`
  height: 100%;
`;

interface Props {
  rooms: LiveRoom[];
}

const LiveRoomList: FC<Props> = ({ rooms }) => {
  const [isEnterModalOpen, setIsEnterModalOpen] = useState<boolean>(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<LiveRoom | null>(null);

  const openEnterRoomModal = useCallback((room: LiveRoom) => {
    setSelectedRoom(room);
    setIsEnterModalOpen(true);
  }, []);

  const closeEnterRoomModal = useCallback(() => {
    setSelectedRoom(null);
    setIsEnterModalOpen(false);
  }, []);

  const openCloseRoomModal = useCallback((room: LiveRoom) => {
    setSelectedRoom(room);
    setIsCloseModalOpen(true);
  }, []);

  const closeCloseRoomModal = useCallback(() => {
    setSelectedRoom(null);
    setIsCloseModalOpen(false);
  }, []);

  return (
    <>
      <LiveRoomListBlock>
        {rooms.map((room) => (
          <LiveRoomSlot
            key={room.id}
            room={room}
            onEnter={() => openEnterRoomModal(room)}
            onClose={() => openCloseRoomModal(room)}
          />
        ))}
      </LiveRoomListBlock>
      {selectedRoom ? (
        <>
          <EnterRoomModal
            open={isEnterModalOpen}
            room={selectedRoom}
            onCancel={closeEnterRoomModal}
          />
          <CloseRoomModal
            open={isCloseModalOpen}
            room={selectedRoom}
            onCancel={closeCloseRoomModal}
          />
        </>
      ) : null}
    </>
  );
};

export default LiveRoomList;
