import path from 'path';
import glob from 'glob';
import _ from 'lodash';
const modelsDir = 'app/database/models';
const helpersDir = 'app/database/helpers';

const initializeMongoose = (mongoose) => {
  const response = {
    collections: {}
  };
  const mongoModels = {};
  const mongoModules = {};

  const rootDirecotry = process.env.WEBROOT_PATH || process.cwd();
  const modelsPath = path.join(rootDirecotry, modelsDir, "/*");
  const ref = glob.sync(modelsPath);

  ref.forEach(file => {
    const modelName = path.basename(file, path.extname(file));
    const model = require(file);
    const schema = model.schema(mongoose.Schema);
    const mongooseModel = mongoose.model(modelName, schema);
    response.collections[modelName] = mongooseModel;
    mongoModels[modelName] = mongooseModel;
    mongoModules[modelName] = model;
  });

  const helpersPath = path.join(rootDirecotry, helpersDir, "/*");
  const helpersRef = glob.sync(helpersPath);
  helpersRef.forEach(file => {
    const modelName = path.basename(file, path.extname(file));
    const helper = require(file);
    response[modelName] = helper(mongoModels);
  });

  return response;
}

export default initializeMongoose;