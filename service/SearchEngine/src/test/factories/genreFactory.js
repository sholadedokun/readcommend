// test/factories/user.js
import { faker } from '@faker-js/faker';
import genre from '../../models/Genre.js';

const data = async (props = {}) => {

  const defaultProps = {
    title: faker.lorem.word(),   
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  genre.create(await data(props));