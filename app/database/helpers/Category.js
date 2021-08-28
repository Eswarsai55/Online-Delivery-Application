import ModelHelper from '../../libs/modelHelpers';

module.exports = (models) => {
  const helper = {};
  const { Category } = models;
  helper.model = Category;

  helper.Save = (data) => {
    return ModelHelper.Save(Category, data);
  }

  helper.Update = (id, data) => {
    return ModelHelper.Update(Category, id, data);
  }

  helper.Delete = (id) => {
    return ModelHelper.Delete(Category, id);
  }

  helper.Find = (search, throwError = true) => {
    return ModelHelper.Find(Category, search, throwError).then(docs => {
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
    return ModelHelper.caseInsensitiveFind(Category, data, throwError).then(docs => {
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
    return ModelHelper.complexFind(Category, data, queryType, throwError).then(docs => {
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