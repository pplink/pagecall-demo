import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import LiveRoomList from '../components/LiveRoomList';
import {
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Switch,
  TextField,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { Room } from '../models';
import { request } from '../helpers';
import { useRoomsDispatch, useRoomsState } from '../contexts/RoomsContext';

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

const MainPage: FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [searchInputs, setSearchInputs] = useState('');
  const roomsState = useRoomsState();
  const roomsDispatch = useRoomsDispatch();

  useEffect(() => {
    request
      .get<{ liveRooms: Room[]; closedRooms: Room[] }>('/rooms')
      .then((res) => {
        roomsDispatch({
          type: 'INIT_ROOMS',
          liveRooms: res.liveRooms,
          closedRooms: res.closedRooms,
        });
      })
      .catch((e) => console.error(e));

    return () => {
      roomsDispatch({ type: 'INIT_ROOMS', liveRooms: [], closedRooms: [] });
    };
  }, [roomsDispatch]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInputs(value);
  };

  return (
    <MainPageBlock>
      <HeaderBlock>
        <h1>Rooms</h1>
        <FormGroup
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            style={{ width: '256px' }}
            placeholder="Search by room name"
            type="search"
            onChange={onSearchChange}
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
              <Switch
                color="secondary"
                checked={isLive}
                onChange={() => {
                  setIsLive((isLive) => !isLive);
                }}
              />
            }
            label="Live"
          />
        </FormGroup>
      </HeaderBlock>
      <Divider style={{ marginTop: '32px' }} />
      <LiveRoomList
        rooms={roomsState.liveRooms.filter((room) => {
          return room.name.includes(searchInputs);
        })}
      />
    </MainPageBlock>
  );
};

export default MainPage;
