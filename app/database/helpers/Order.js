import ModelHelper from '../../libs/modelHelpers';

module.exports = (models) => {
  const helper = {};
  const { Order } = models;
  helper.model = Order;

  helper.Save = (data) => {
    return ModelHelper.Save(Order, data);
  }

  helper.Update = (id, data) => {
    return ModelHelper.Update(Order, id, data);
  }

  helper.Delete = (id) => {
    return ModelHelper.Delete(Order, id);
  }

  helper.Find = (search, throwError = true) => {
    return ModelHelper.Find(Order, search, throwError).then(docs => {
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
    return ModelHelper.caseInsensitiveFind(Order, data, throwError).then(docs => {
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
    return ModelHelper.complexFind(Order, data, queryType, throwError).then(docs => {
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

  helper.findLastRecord = (search) => {
    return ModelHelper.findLastRecord(Order, search).then(docs => docs);
  }

  return helper;
}