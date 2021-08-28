import ModelHelper from '../../libs/modelHelpers';
const { REQUIRED_STRING_SCHEMA, DEFAULT_DATE_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const Menu = new Schema({
    name: REQUIRED_STRING_SCHEMA,
    price: Number,
    thumbnail: String,
    available_at: Array,
    is_available: {
      type: Boolean,
      default: true,
    },
    category_id: REQUIRED_STRING_SCHEMA,
    description: String,
    added_on: DEFAULT_DATE_SCHEMA,
    modified_on: DEFAULT_DATE_SCHEMA,
  }, {collection: 'Menu'});

  return Menu;
}