export type Room = {
  id: string;
  name: string;
  pcaRoomId: string;
  start: Date;
  end: Date | null;
  participant: number;
  createdAt: Date;
  updatedAt: Date;
};
