import sequelize from "../database/Sequalize.js"
import { DataTypes } from "sequelize"
import book from "./Book.js"

const genre = sequelize.define('genre',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
},{tableName: 'genre', timestamps: false})
genre.associate = function() {
  genre.hasMany(book)
}
export default genre