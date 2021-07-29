/**
 * Room Model
 */

import { PCA } from '../helpers';

// Mock DB
const MockDB: Room[] = [];

export class Room {
  public id: string;
  public name: string;
  public pcaRoomId: string;
  public start: Date;
  public end: Date | null;
  public participant: number;
  public createdAt: Date;
  public updatedAt: Date;

  /**
   * @param id 룸 ID
   * @param name 룸 이름
   * @param pcaRoomId PageCall 룸 ID
   * @param start 시작 시간
   */
  constructor(id: string, name: string, pcaRoomId: string, start: Date) {
    this.id = id;
    this.name = name;
    this.pcaRoomId = pcaRoomId;
    this.start = start;
    this.end = null;
    this.participant = 0;

    const now = new Date();

    this.createdAt = now;
    this.updatedAt = now;
  }

  /**
   * 룸
   * @param id 룸 ID
   */
  static getRoomById(id: string): Room {
    const room: Room = MockDB.find((room) => room.id === id);

    return room;
  }

  /**
   * 모든 룸 목록
   */
  static getAllRooms(): Room[] {
    return MockDB;
  }

  /**
   * 종료되지 않은 룸 목록
   */
  static async getLiveRooms(): Promise<Room[]> {
    const rooms = await Promise.all(
      MockDB.filter((room) => room.end === null).map(async (room) => {
        const participant = (await PCA.getSessions(room.pcaRoomId, 0, 1000)).length;

        return { ...room, participant } as Room;
      }),
    );

    rooms.sort((a, b) => (a.start >= b.start ? -1 : 1));

    return rooms;
  }

  /**
   * 종료된 룸 목록
   */
  static getClosedRooms(): Room[] {
    const rooms = MockDB.filter((room) => room.end !== null);

    rooms.sort((a, b) => (a.end >= b.end ? -1 : 1));

    return rooms;
  }

  /**
   * 신규 데이터 저장
   */
  insert() {
    MockDB.push(this);
    return;
  }

  /**
   * 데이터 업데이트
   */
  update() {
    this.updatedAt = new Date();
    return;
  }
}
