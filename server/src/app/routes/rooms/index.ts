/**
 * /rooms
 */
import { Router, Request, Response, NextFunction } from 'express';
import { Room } from '../../../models';
import { checkData, createRandomString, PCA, throwError } from '../../../helpers';
import env from '../../../env';

const router: Router = Router({ mergeParams: true });

// 룸 목록
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const liveRooms = await Room.getLiveRooms();

        const closedRooms = Room.getClosedRooms();

        res.status(200);
        res.json({ liveRooms, closedRooms });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 룸 생성
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: { name: string } = req.body;

        if (!checkData(name)) {
            throwError('Bad Request', 400);
        }

        const id = createRandomString(16);
        const start = new Date();

        const pcaRoom = await PCA.createRoom('private', name, env.PAGECALL_LAYOUT_ID);

        const room = new Room(id, name, pcaRoom.id, start);
        room.insert();

        res.status(200);
        res.json({ room });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 룸 입장
router.post('/:roomId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId } = req.params;
        const { nickname }: { nickname: string } = req.body;

        if (!checkData(nickname)) {
            throwError('Bad Request', 400);
        }

        const room = Room.getRoomById(roomId);

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

// 룸 종료
router.put('/:roomId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId } = req.params;

        const room = Room.getRoomById(roomId);

        // 이미 종료된 룸
        if (!checkData(room)) {
            throwError('Not Found', 404);
        }

        if (room.end !== null) {
            res.status(200);
            res.json({ room });
            res.end();
            return;
        }

        const { room: pcaRoom } = await PCA.updateRoom(room.pcaRoomId, true);
        const members = await PCA.getMembers(pcaRoom.id, 0, 1000);

        const now = new Date();

        room.end = now;
        room.participant = members.length;
        room.updatedAt = now;

        room.update();

        res.status(200);
        res.json({ room });
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
