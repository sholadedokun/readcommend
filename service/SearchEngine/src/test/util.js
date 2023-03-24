import sequelize  from "../database/Sequalize.js"

const dropAllTables = async() => {
  Object.values(sequelize.models).map(async (model) => {
    await model.destroy({ truncate: true });
  }); 
}

const dropTable = async(model) => {
  await model.destroy({ truncate: true });
}

export {
  dropTable,
  dropAllTables
}