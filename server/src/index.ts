import { config } from 'dotenv';
config({ path: `${__dirname}/../.env` });

import app from './app';
import env from './env';

function main(port: number) {
    let isDisableKeepAlive = false;

    app.use((req, res, next) => {
        if (isDisableKeepAlive) {
            res.set('Connection', 'close');
        }

        next();
    });

    const server = app.listen(port, () => {
        console.warn(`Listening on port ${port}`);

        if (env.NODE_ENV === 'production') {
            process.send('ready');
        }
    });

    process.on('SIGINT', () => {
        isDisableKeepAlive = true;

        server.close(() => {
            console.warn('Server closed');
            process.exit(0);
        });
    });
}

main(Number(env.PORT));
