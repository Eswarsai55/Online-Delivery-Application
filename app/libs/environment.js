import Dotenv from 'dotenv';

export default () => {
  const envFilePath = process.env.APP_ROOT_PATH + "/.env";
  try {
    Dotenv.config({
      path: envFilePath
    });
  } catch (e){
    throw new Error("Missing .env file. please refer Readme.md");
  }
};