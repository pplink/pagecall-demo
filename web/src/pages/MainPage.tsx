import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import LiveRoomList from '../components/LiveRoomList';
import {
  Button,
  Divider,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { LiveRoom, ClosedRoom } from '../models';
import { request } from '../helpers';
import { useRoomsDispatch, useRoomsState } from '../contexts/RoomsContext';
import CreateRoomModal from '../components/CreateRoomModal';
import ClosedRoomList from '../components/ClosedRoomList';
import { useCallback } from 'react';

const MainPageBlock = styled.div`
  width: 50%;
  height: 100%;

  background: white;

  margin: 0 auto;
  margin-top: 64px;
  border-radius: 10px;

  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 256px;
`;

const HeaderBlock = styled.div`
  padding-top: 8px;
`;

const HeaderBlockRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MainPage: FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchInputs, setSearchInputs] = useState('');

  const roomsState = useRoomsState();
  const roomsDispatch = useRoomsDispatch();

  useEffect(() => {
    let isCancelled = false;

    request
      .get<{ liveRooms: LiveRoom[]; closedRooms: ClosedRoom[] }>('/rooms')
      .then((res) => {
        if (isCancelled) return;
        roomsDispatch({
          type: 'INIT_ROOMS',
          liveRooms: res.liveRooms,
          closedRooms: res.closedRooms,
        });
      })
      .catch((e) => console.error(e));

    return () => {
      isCancelled = true;
      roomsDispatch({ type: 'INIT_ROOMS', liveRooms: [], closedRooms: [] });
    };
  }, [roomsDispatch]);

  const onToggle = useCallback(() => {
    setIsLive((isLive) => !isLive);
  }, []);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputs(e.target.value);
  }, []);

  const openCreateRoomModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const closeCreateRoomModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const liveRooms: LiveRoom[] = useMemo(
    () =>
      roomsState.liveRooms
        .filter((room) => room.name.includes(searchInputs))
        .sort((a, b) => (a.start > b.start ? -1 : 1)), // ?????? ?????? ????????? ????????? ??????
    [roomsState, searchInputs],
  );

  const closedRooms: ClosedRoom[] = useMemo(
    () =>
      roomsState.closedRooms
        .filter((room) => room.name.includes(searchInputs))
        .sort((a, b) => (a.start > b.start ? -1 : 1)), // ?????? ?????? ????????? ????????? ??????
    [roomsState, searchInputs],
  );

  return (
    <MainPageBlock>
      <HeaderBlock>
        <HeaderBlockRow>
          <h1>Rooms</h1>
          <Button
            variant="outlined"
            color="primary"
            onClick={openCreateRoomModal}
          >
            Create
          </Button>
        </HeaderBlockRow>
        <HeaderBlockRow>
          <TextField
            style={{ width: '256px' }}
            placeholder="Search by room name"
            type="search"
            onChange={onSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Switch color="secondary" checked={isLive} onChange={onToggle} />
            }
            label="Live"
          />
        </HeaderBlockRow>
      </HeaderBlock>
      <Divider style={{ marginTop: '32px' }} />
      {isLive ? (
        <LiveRoomList rooms={liveRooms} />
      ) : (
        <ClosedRoomList rooms={closedRooms} />
      )}
      <CreateRoomModal
        open={isCreateModalOpen}
        onCancel={closeCreateRoomModal}
      />
    </MainPageBlock>
  );
};

export default MainPage;
