import Boom from 'boom';
import _ from 'lodash';
import { Model } from 'mongoose';

module.exports = { 
  Find: (model, search, throwError = true) => {
    return new Promise((resolve, reject) => {
      const promise = search.id ? model.findById(search.id) : model.find(search);
      promise.then(res => {
        if (!res || (_.isArray(res) && !res.length)) {
          if (throwError) {
            return reject(Boom.badRequest(`${model.collection.collectionName} not found`));
          }

          return resolve(false);
        }

        if (!_.isArray(res)) {
          return resolve([res]);
        }

        return resolve(res);
      }).catch(reject);
    });
  },

  Update: (model, id, data) => {
    const modelName = model.collection.collectionName;
    return new Promise((resolve,reject) => {
      model.findByIdAndUpdate(id, data, false).then(res => {
        if (!res) {
          return reject(Boom.badRequest(`${modelName} not found.`));
        } 

        return model.findById(id).then(resolve, reject);
      }).catch(err => {
        console.log(err);
        return reject(Boom.badRequest(`Not able to update ${modelName} information.`));
      });
    });
  },

  Delete: (model, id) => {
    const modelName = model.collection.collectionName;
    return new Promise((resolve,reject) => {
      model.findByIdAndDelete(id, false).then(res => {
        if (!res) {
          return reject(Boom.badRequest(`${modelName} not found.`));
        }

        return resolve({
          message: `${modelName} deleted Successfully.`,
        });
      }).catch(err => {
        console.log(err);
        return reject(Boom.badRequest(`Unable to delete ${modelName}`));
      });
    });
  },

  Save: (model, data, showMongoError = false) => {
    const newRecord = new model(data);
    return newRecord.save().catch(err => {
      console.log(err);
      if (showMongoError) {
        return Promise.reject(err);
      }
      return Promise.reject(Boom.badRequest('Invalid payload passed while saving data'));
    });
  },

  caseInsensitiveQuery: (value) => {
    let query = {};
    query = {$regex: value, $options: 'i'};
    return query
  },

  caseInsensitiveFind: function(model, query, throwError) {
    const key = Object.keys(query)[0];
    const value = query[key];
    const queryStmt = {[key]: this.caseInsensitiveQuery(value)};
    return this.Find(model, queryStmt, throwError);    
  },

  complexFind: function(model, query, queryType, throwError) {
    const keys = Object.keys(query);
    const queryCondition = keys.map(key => {
      return Object.assign({},{
        [key]: this.caseInsensitiveQuery(query[key])
      })
    })
    const queryStmt = queryType === 'Intersection' ? {'$and': queryCondition } : {'$or': queryCondition };
    return this.Find(model, queryStmt, throwError);
  },

  findLastRecord: function(model, query) {
    return model.find(query).limit(1).sort({$natural: -1}).then(res => res);
  },

  REQUIRED_STRING_SCHEMA: {
    type: String,
    required: true,
  },

  REQUIRED_NUMBER_SCHEMA: {
    type: Number,
    required: true,
  },

  REQUIRED_BOOLEAN_SCHEMA: {
    type: Boolean,
    required: true,
  },

  REQUIRED_DATE_SCHEMA: {
    type: Date,
    required: true,
  },

  DEFAULT_DATE_SCHEMA: {
    type: Date,
    default: Date.now(),
  },
}