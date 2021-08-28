import ModelHelper from '../../libs/modelHelpers';

module.exports = (models) => {
  const helper = {};
  const { User } = models;
  helper.model = User;

  helper.Save = (data) => {
    return ModelHelper.Save(User, data);
  }

  helper.Update = (id, data) => {
    return ModelHelper.Update(User, id, data);
  }

  helper.Delete = (id) => {
    return ModelHelper.Delete(User, id);
  }

  helper.Find = (search, throwError = true) => {
    return ModelHelper.Find(User, search, throwError).then(docs => {
      if (!docs) {
        return false;
      }

      return docs.map(doc => {
        return Object.assign({}, doc.toObject(), {
          id: doc.id
        });
      });
    });
  }

  helper.caseInsensitiveQuery = (value) => {
    return ModelHelper.caseInsensitiveQuery(value);
  }

  helper.caseInsensitiveFind = (data, throwError = true) => {
    return ModelHelper.caseInsensitiveFind(User, data, throwError).then(docs => {
      if (!docs) {
        return false;
      }

      return docs.map(doc => {
        return Object.assign({}, doc.toObject(), {
          id: doc.id
        });
      });
    });
  }

  helper.complexFind = (data, queryType, throwError = true) => {
    return ModelHelper.complexFind(User, data, queryType, throwError).then(docs => {
      if (!docs) {
        return false;
      }

      return docs.map(doc => {
        return Object.assign({}, doc.toObject(), {
          id: doc.id
        });
      });
    });
  }

  return helper;
}