// test/factories/user.js
import { faker } from '@faker-js/faker';
import author from '../../models/Author.js';

const data = async (props = {}) => {

  const defaultProps = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  author.create(await data(props));