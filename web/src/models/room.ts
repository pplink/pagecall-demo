export type Room = {
  id: string;
  name: string;
  pcaRoomId: string;
  start: string;
  end: string | null;
  participant: number;
  createdAt: string;
  updatedAt: string;
};
