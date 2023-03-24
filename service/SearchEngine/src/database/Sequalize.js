import { Sequelize } from "sequelize"
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const config = require ("./config.json")

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