import ModelHelper from '../../libs/modelHelpers';
const { REQUIRED_STRING_SCHEMA, DEFAULT_DATE_SCHEMA } = ModelHelper;

module.exports.schema = (Schema) => {
  const Category = new Schema({
    name: REQUIRED_STRING_SCHEMA,
    parent_category_id: String,
    added_on: DEFAULT_DATE_SCHEMA,
    modified_on: DEFAULT_DATE_SCHEMA,
  }, {collection: 'Category'});

  return Category;
}