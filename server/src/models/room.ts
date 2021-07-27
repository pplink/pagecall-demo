/**
 * Room Model
 */

import { PCA } from '../helpers';

// Mock DB
const MockDB: Room[] = [];

export class Room {
    public id: string;
    public name: string;
    public pcaRoomId: string; // PageCall Room ID
    public start: Date;
    public end: Date | null;
    public participant: number;
    public createdAt: Date;
    public updatedAt: Date;

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

    static getRoomById(id: string): Room {
        const room: Room = MockDB.find((room) => room.id === id);

        return room;
    }

    static getAllRooms(): Room[] {
        return MockDB;
    }

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

    static getClosedRooms(): Room[] {
        const rooms = MockDB.filter((room) => room.end !== null);

        rooms.sort((a, b) => (a.end >= b.end ? -1 : 1));

        return rooms;
    }

    insert() {
        MockDB.push(this);
        return;
    }

    update() {
        this.updatedAt = new Date();
        return;
    }
}
