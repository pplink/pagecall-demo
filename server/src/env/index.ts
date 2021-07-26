/**
 * Enviromnent Variable Preset for Performance
 */
const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const PAGECALL_API_KEY = process.env.PAGECALL_API_KEY;

const envs = {
    NODE_ENV,
    PORT,
    PAGECALL_API_KEY,
};

export default envs;
