import { faker } from '@faker-js/faker';
import size from '../../models/Size.js';

const data = async (props = {}) => {

  const defaultProps = {
    title: faker.name.firstName(),
    min_pages: faker.random.numeric(2),
    max_pages: faker.random.numeric(4)
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  size.create(await data(props));