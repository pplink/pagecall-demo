/**
 * Enviromnent Variable Preset for Performance
 */
const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const PAGECALL_API_KEY = process.env.PAGECALL_API_KEY;

const PAGECALL_LAYOUT_ID = process.env.PAGECALL_LAYOUT_ID;

const env = {
  NODE_ENV,
  PORT,
  PAGECALL_API_KEY,
  PAGECALL_LAYOUT_ID,
};

export default env;
