import mongoose from 'mongoose';

module.exports = () => {
  const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME, MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env;
  return new Promise((resolve, reject) => {
    const dbUrl = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}`;
    mongoose.connect(dbUrl, {dbName: MONGO_DB_NAME, useNewUrlParser: true, useUnifiedTopology: true})
      .then((result) => {
        console.log('Database connection successful');
        return resolve(result);
      }).catch(err => {
        console.error('Database connection error', err)
        return reject(err);
      });
  });
}