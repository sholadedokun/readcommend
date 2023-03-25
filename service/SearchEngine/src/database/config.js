export default {
  "development" : {
    "database": "readcommend",
    "username": "postgres",
    "password": "password123",
    "host": "0.0.0.0",
    "port": "5432",
    "dialect": "postgres",
    "dialectOptions": { 
      "decimalNumbers": true 
    },
    "logging": true
  },
  "test": {
    "database": "readcommend_test",
    "username": "postgres",
    "password": "password123",
    "host": "0.0.0.0",
    "port": "5432",
    "dialect": "postgres",
    "dialectOptions": {
      "decimalNumbers": true 
    },
    "logging": false
  },
  "production": {
    "database": process.env.POSTGRES_DB,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "host": process.env.PSQL_HOST,
    "port": process.env.POSTGRES_PORT,
    "dialect": "postgres",
    "dialectOptions": {
      "decimalNumbers": true,
    },
    "logging": true
  }
}