/**
 * Room Model
 */

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

    static getRoomByID(id: string): Room {
        const room: Room = MockDB.find((room) => room.id === id);

        return room;
    }

    static getRooms(): Room[] {
        return MockDB;
    }

    insert() {
        MockDB.push(this);
        return;
    }

    update() {
        return;
    }
}
