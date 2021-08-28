import ModelHelper from '../../libs/modelHelpers';

module.exports = (models) => {
  const helper = {};
  const { Menu } = models;
  helper.model = Menu;

  helper.Save = (data) => {
    return ModelHelper.Save(Menu, data);
  }

  helper.Update = (id, data) => {
    return ModelHelper.Update(Menu, id, data);
  }

  helper.Delete = (id) => {
    return ModelHelper.Delete(Menu, id);
  }

  helper.Find = (search, throwError = true) => {
    return ModelHelper.Find(Menu, search, throwError).then(docs => {
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
    return ModelHelper.caseInsensitiveFind(Menu, data, throwError).then(docs => {
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
    return ModelHelper.complexFind(Menu, data, queryType, throwError).then(docs => {
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