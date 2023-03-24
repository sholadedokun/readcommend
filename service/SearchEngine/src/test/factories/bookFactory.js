import { faker } from '@faker-js/faker';
import book from '../../models/Book.js';
import authorFactory from './authorFactory.js';
import genreFactory from './genreFactory.js'
const data = async (props = {}) => {
  
  const genre_id = !!props.genre_id? props.genre_id: await generate_genre()
  
  const author_id = !!props.author_id? props.author_id: await generate_author()
  
  const defaultProps = {
    title: faker.company.catchPhrase(),
    year_published: 0,
    rating: 0.0,
    pages: 0,
    genre_id,
    author_id
  };
  return Object.assign({}, defaultProps, props);
};

const generate_author = async() => {
  const new_author = await authorFactory()
  return new_author.id
}

const generate_genre = async() => {
  const new_genre = await genreFactory()
  return new_genre.id
}

export default async (props = {}) =>
  book.create(await data(props));