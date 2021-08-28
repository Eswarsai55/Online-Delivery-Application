import ModelHelper from '../../libs/modelHelpers';
import { USER_TYPES } from '../../libs/constants';
const { REQUIRED_STRING_SCHEMA, DEFAULT_DATE_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const User = new Schema({
    first_name: REQUIRED_STRING_SCHEMA,
    last_name: REQUIRED_STRING_SCHEMA,
    phone_number: {
      type: String,
      required: true,
    },
    email: String,
    password: String,
    address: String,
    user_type: {
      type: String,
      enum: USER_TYPES,
    },
    added_on: DEFAULT_DATE_SCHEMA,
    modified_on: DEFAULT_DATE_SCHEMA,
  }, {collection: 'User'});

  return User;
}