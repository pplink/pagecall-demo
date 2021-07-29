import { config } from 'dotenv';
config({ path: `${__dirname}/../.env` });

import app from './app';
import env from './env';

function main(port: number) {
  let isDisableKeepAlive = false;

  app.use((req, res, next) => {
    if (isDisableKeepAlive) {
      // 서버가 종료 절차에 있을 때, 이 응답을 마지막으로 클라이언트와의 연결을 끊는다.
      res.set('Connection', 'close');
    }

    next();
  });

  const server = app.listen(port, () => {
    console.warn(`Listening on port ${port}`);

    // pm2로 실행 시, pm2 클러스터로 실행이 준비 되었다는 시스템콜을 보낸다.
    if (env.NODE_ENV === 'production') {
      process.send('ready');
    }
  });

  // pm2 클러스터로 부터 종료 요청을 받았을 때, 서버를 종료한다.
  process.on('SIGINT', () => {
    isDisableKeepAlive = true;

    server.close(() => {
      console.warn('Server closed');
      process.exit(0);
    });
  });
}

main(Number(env.PORT));
