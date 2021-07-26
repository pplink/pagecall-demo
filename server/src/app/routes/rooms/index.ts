/**
 * /rooms
 */
import { Router, Request, Response, NextFunction } from 'express';
import { Room } from '../../../models';
import { checkData, createRandomString, PCA, throwError } from '../../../helpers';

const router: Router = Router({ mergeParams: true });

// 미팅 목록
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = Room.getRooms();

        const liveRooms = rooms.filter((room) => room.end === null);
        liveRooms.sort((a, b) => (a.start >= b.start ? -1 : 1));
        await Promise.all(
            liveRooms.map(async (room) => {
                room.participant = (await PCA.getSessions(room.pcaRoomId, 0, 1000)).length;
            }),
        );

        const closedRooms = rooms.filter((room) => room.end !== null);
        closedRooms.sort((a, b) => (a.end >= b.end ? -1 : 1));

        res.status(200);
        res.json({ liveRooms, closedRooms });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 생성
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: { name: string } = req.body;

        if (!checkData(name)) {
            throwError('Bad Request', 400);
        }

        const id = createRandomString(16);
        const start = new Date();

        const pcaRoom = await PCA.createRoom('private', name, '6010ddd3e1ed810009878b55');

        const room = new Room(id, name, pcaRoom.id, start);
        room.insert();

        res.status(200);
        res.json({ room });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 입장
router.post('/:roomId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId } = req.params;
        const { nickname }: { nickname: string } = req.body;

        if (!checkData(nickname)) {
            throwError('Bad Request', 400);
        }

        const room = Room.getRoomByID(roomId);

        if (!checkData(room)) {
            throwError('Not Found', 404);
        }

        const userId = createRandomString(16);
        const user = await PCA.createUser(userId, nickname);
        const member = await PCA.addMember(room.pcaRoomId, user.user_id);

        const url = `https://app.pagecall.net/${member.room_id}?access_token=${member.access_token}`;

        res.status(200);
        res.json({ url });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 종료
router.put('/:roomId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId } = req.params;

        const room = Room.getRoomByID(roomId);

        if (!checkData(room)) {
            throwError('Not Found', 404);
        }

        const { room: pcaRoom } = await PCA.updateRoom(room.pcaRoomId, true);
        const members = await PCA.getMembers(pcaRoom.id, 0, 1000);

        room.end = new Date();
        room.participant = members.length;

        room.update();

        res.status(200);
        res.json({ room });
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
