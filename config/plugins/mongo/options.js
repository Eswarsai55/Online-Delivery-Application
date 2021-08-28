export default {
  host: process.env.MONGO_DB_HOST,
  port: process.env.MONGO_DB_PORT,
  db: process.env.MONGO_DB_NAME,
  // authKey: process.env.RETHINK_DB_AUTH_KEY,
  // password: process.env.RETHINK_DB_AUTH_KEY,
  // user: process.env.RETHINK_DB_USER,
  modelsDir: 'app/database/models',
  // ssl : process.env.RETHINK_DB_USE_SSL ? { ca : RETHINK_CERT } : false,
  //connection pool setting default
  // buffer: 50,
  // max: 1000,
  // timeout: 200,
  // timeoutGb: 15*60*1000,
  // pingInterval: 10
}