import sequelize from "../database/Sequalize.js"
import { DataTypes } from "sequelize"

const era = sequelize.define('era',{
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
  min_year: {
    type: DataTypes.SMALLINT,
  },
  max_year: {
    type: DataTypes.SMALLINT,
  }
},{tableName: 'era', timestamps: false})

export default era