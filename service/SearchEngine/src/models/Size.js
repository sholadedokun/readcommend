import sequelize from "../database/Sequalize.js"
import { DataTypes } from "sequelize"

const size = sequelize.define('size',{
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
  min_pages: {
    type: DataTypes.SMALLINT,
  },
  max_pages: {
    type: DataTypes.SMALLINT,
  }
},{tableName: 'size', timestamps: false})

export default size