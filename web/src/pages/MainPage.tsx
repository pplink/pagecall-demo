import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
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
  const [isCreate, setIsCreate] = useState(false);
  const [searchInputs, setSearchInputs] = useState('');

  const roomsState = useRoomsState();
  const roomsDispatch = useRoomsDispatch();

  const isCancelled = useRef(false);
  useEffect(() => {
    if (!isCancelled.current) {
      request
        .get<{ liveRooms: LiveRoom[]; closedRooms: ClosedRoom[] }>('/rooms')
        .then((res) =>
          roomsDispatch({
            type: 'INIT_ROOMS',
            liveRooms: res.liveRooms,
            closedRooms: res.closedRooms,
          }),
        )
        .catch((e) => console.error(e));
    }

    return () => {
      isCancelled.current = true;
      roomsDispatch({ type: 'INIT_ROOMS', liveRooms: [], closedRooms: [] });
    };
  }, [roomsDispatch]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInputs(value);
  };

  const onCreate = () => {
    setIsCreate(true);
  };
  // 함수들을 useCallback으로 감싸 주는게 권장 스펙
  const onCreateInCreateModal = (name: string) => {
    request
      .post<{ room: LiveRoom }>('rooms', {
        name,
      })
      .then(({ room }) => {
        roomsDispatch({ type: 'CREATE_ROOM', room });
      })
      .catch((e) => console.error(e));

    setIsCreate(false);
  };

  const onCancelInCreateModal = () => {
    setIsCreate(false);
  };

  const liveRooms: LiveRoom[] = useMemo(
    () =>
      roomsState.liveRooms
        .filter((room) => room.name.includes(searchInputs))
        .sort((a, b) => (a.start > b.start ? -1 : 1)), // 최신 시작 시간을 상위로 정렬
    [roomsState, searchInputs],
  );

  const closedRooms: ClosedRoom[] = useMemo(
    () =>
      roomsState.closedRooms // 이런 부분도 useMemo를 사용하면 좋은 케이스
        .filter((room) => room.name.includes(searchInputs))
        .sort((a, b) => (a.start > b.start ? -1 : 1)), // 최신 종료 시간을 상위로 정렬
    [roomsState, searchInputs],
  );

  return (
    <MainPageBlock>
      <HeaderBlock>
        <HeaderBlockRow>
          <h1>Rooms</h1>
          <Button variant="outlined" color="primary" onClick={onCreate}>
            Create
          </Button>
        </HeaderBlockRow>
        <HeaderBlockRow>
          <TextField
            style={{ width: '256px' }} // 매 렌더마다 객체가 계속 생성됨. 밖에 빼는 것이 좋다. 만약 변경이 되는 값을 사용한다면 useMemo로 추가 개선이 가능.
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
        </HeaderBlockRow>
      </HeaderBlock>
      <Divider style={{ marginTop: '32px' }} />
      {isLive ? (
        <LiveRoomList rooms={liveRooms} />
      ) : (
        <ClosedRoomList rooms={closedRooms} />
      )}
      <CreateRoomModal
        open={isCreate}
        onCreate={onCreateInCreateModal}
        onCancel={onCancelInCreateModal}
      />
    </MainPageBlock>
  );
};

export default MainPage;
