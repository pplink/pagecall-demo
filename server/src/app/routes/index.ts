/**
 * /
 */
import { Router, Request, Response, NextFunction } from 'express';

import rooms from './rooms';

const router: Router = Router({ mergeParams: true });

router.use('/rooms', rooms);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.get('/ping', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
        res.send('pong');
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
