export type LiveRoom = {
  id: string;
  name: string;
  pcaRoomId: string;
  start: string;
  end: null;
  participant: number;
  createdAt: string;
  updatedAt: string;
};

export type ClosedRoom = {
  id: string;
  name: string;
  pcaRoomId: string;
  start: string;
  end: string;
  participant: number;
  createdAt: string;
  updatedAt: string;
};
