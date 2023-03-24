import { faker } from '@faker-js/faker';
import era from '../../models/Era.js';

const data = async (props = {}) => {

  const defaultProps = {
    title: faker.name.firstName(),
    min_year: faker.random.numeric(4),
    max_year: faker.random.numeric(4)
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  era.create(await data(props));