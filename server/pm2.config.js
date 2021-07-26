module.exports = {
    apps: [
        {
            name: 'pagecall-demo',
            script: 'dist/index.js',
            instances: 0, // CPU 코어 수 만큼 프로세스 운영
            watch: false, // 코드 변경시 자동 재실행
            exec_mode: 'cluster', // fork || cluster
            max_restarts: 10, // 에러 발생시, 최대 재실행 횟수
            wait_ready: true, // process로부터 ready를 받을 때 까지 요청을 받지 않음
            listen_timeout: 50000, // ready를 기다리는 시간
            kill_timeout: 5000, // SIGINT 수신 후, 일정 시간 동안 기존 작업들이 끝나기를 기다린다.
            merge_logs: true,
            env: {
                "NODE_ENV": "production",
            }
        },
    ],
};
