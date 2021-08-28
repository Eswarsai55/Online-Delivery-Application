import ModelHelper from '../../libs/modelHelpers';
import { PAYMENT_TYPES } from '../../libs/constants';
const { REQUIRED_STRING_SCHEMA, DEFAULT_DATE_SCHEMA, REQUIRED_NUMBER_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const Payment = new Schema({
    customer_id: REQUIRED_STRING_SCHEMA,
    vendor_id: String,
    order_id: REQUIRED_STRING_SCHEMA,
    cost: REQUIRED_NUMBER_SCHEMA,
    payment_method: {
      type: String,
      enum: PAYMENT_TYPES,
      required: true,
    },
    added_on: DEFAULT_DATE_SCHEMA,
    modified_on: DEFAULT_DATE_SCHEMA,
  }, {collection: 'Payment'});

  return Payment;
}