import sequelize from "../database/Sequalize.js"
import { DataTypes } from "sequelize"
import book from "./Book.js"

const author = sequelize.define('author', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{tableName: 'author', timestamps: false})

author.associate = function() {
  author.hasMany(book)
}
export default author