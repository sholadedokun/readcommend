// require
module.exports = {
  up: function (queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.createTable('book', {
        id:{
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
      }),
      queryInterface.createTable('author', {
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
      }),
      queryInterface.createTable('era',{
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
      }),
      queryInterface.createTable('genre',{
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
      }),
      queryInterface.createTable('size',{
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
      })
    ])
  },

  down: function (queryInterface) {
    return Promise.all([
      queryInterface.dropTable('book'),
      queryInterface.dropTable('author'),
      queryInterface.dropTable('size'),
      queryInterface.dropTable('era'),
      queryInterface.dropTable('genre')
    ])
  }
};