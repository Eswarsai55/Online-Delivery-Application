import ModelHelper from '../../libs/modelHelpers';

module.exports = (models) => {
  const helper = {};
  const { OTP } = models;
  helper.model = OTP;

  helper.Save = (data) => {
    return ModelHelper.Save(OTP, data);
  }

  helper.Update = (id, data) => {
    return ModelHelper.Update(OTP, id, data);
  }

  helper.Delete = (id) => {
    return ModelHelper.Delete(OTP, id);
  }

  helper.Find = (search, throwError = true) => {
    return ModelHelper.Find(OTP, search, throwError).then(docs => {
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
    return ModelHelper.caseInsensitiveFind(OTP, data, throwError).then(docs => {
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
    return ModelHelper.complexFind(OTP, data, queryType, throwError).then(docs => {
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