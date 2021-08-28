import ModelHelper from '../../libs/modelHelpers';
import { PAYMENT_TYPES, ORDER_STATUS } from '../../libs/constants';
const { REQUIRED_STRING_SCHEMA, DEFAULT_DATE_SCHEMA, REQUIRED_NUMBER_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const Order = new Schema({
    customer_id: REQUIRED_STRING_SCHEMA,
    payment_method: {
      type: String,
      enum: PAYMENT_TYPES,
      required: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUS,
      required: true,
    },
    delivery_person_id: String,
    ordered_items: [{
      _id: false,
      menu_id: REQUIRED_STRING_SCHEMA,
      menu_name: REQUIRED_STRING_SCHEMA,
      count: REQUIRED_NUMBER_SCHEMA,
    }],
    added_on: DEFAULT_DATE_SCHEMA,
    modified_on: DEFAULT_DATE_SCHEMA,
  }, {collection: 'Order'});

  return Order;
}