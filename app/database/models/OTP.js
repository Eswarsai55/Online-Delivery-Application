import ModelHelper from '../../libs/modelHelpers';
const { REQUIRED_STRING_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const OTP = new Schema({
    otp: REQUIRED_STRING_SCHEMA,
    verified: Boolean,
    tested: Boolean,
  }, {collection: 'OTP'});

  return OTP;
}