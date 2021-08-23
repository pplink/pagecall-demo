import React, { useReducer, createContext, Dispatch, useContext } from 'react';
import { Room } from '../models';

type State = {
  liveRooms: Room[];
  closedRooms: Room[];
};

type Action =
  | { type: 'INIT_ROOMS'; liveRooms: Room[]; closedRooms: Room[] }
  | { type: 'CREATE_ROOM'; room: Room }
  | { type: 'CLOSE_ROOM'; room: Room };

type RoomsDispatch = Dispatch<Action>;

const RoomsStateContext = createContext<State | null>(null);
const RoomsDispatchContext = createContext<RoomsDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT_ROOMS':
      return {
        liveRooms: [...action.liveRooms],
        closedRooms: [...action.closedRooms],
      };
    case 'CREATE_ROOM':
      return {
        ...state,
        liveRooms: state.liveRooms.concat([action.room]),
      };
    case 'CLOSE_ROOM':
      return {
        liveRooms: state.liveRooms.filter((room) => room.id !== action.room.id),
        closedRooms: state.closedRooms.concat([action.room]),
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    liveRooms: [],
    closedRooms: [],
  });

  return (
    <RoomsStateContext.Provider value={state}>
      <RoomsDispatchContext.Provider value={dispatch}>
        {children}
      </RoomsDispatchContext.Provider>
    </RoomsStateContext.Provider>
  );
}

export function useRoomsState(): State {
  const state = useContext(RoomsStateContext);
  if (!state) throw new Error('Cannot find RoomsProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useRoomsDispatch(): RoomsDispatch {
  const dispatch = useContext(RoomsDispatchContext);
  if (!dispatch) throw new Error('Cannot find RoomsProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
