import { Sequelize } from "sequelize"
import config from "./config.js"

// by default sequelize parses Decimal number as JS 
Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;
const nodeEnv = process.env.NODE_ENV || "development"
const {database, username, password, host, port, dialect, dialectOptions, logging} = config[nodeEnv]

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  dialectOptions,
  logging
});
export default sequelize