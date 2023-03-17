import sequelize from "../database/Sequalize.js"
import { DataTypes } from "sequelize"
import genre from "./Genre.js"
import author from "./Author.js"

const book = sequelize.define('book',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  year_published: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
  },
  pages: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  genre_id: {
    type: DataTypes.INTEGER,
  }, 
  author_id: {
    type: DataTypes.INTEGER,
  }
},{tableName: 'book', timestamps: false})

book.belongsTo(author, {
  foreignKey: { name:'author_id'}
})
book.belongsTo(genre, {
  foreignKey: { name:'genre_id'}
})

export default book