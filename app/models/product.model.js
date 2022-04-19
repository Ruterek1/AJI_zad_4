const parse = require("nodemon/lib/cli/parse");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        isEmpty(value) {
          if (value == "") {
            throw new Error('Error! Name cannot be empty');
          }
        }
      }      
    },
    description: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        isEmpty(value) {
          if (value == "") {
            throw new Error('Error! Description cannot be empty');
          }
        }
      }      
    },
    unit_price: {
      type: Sequelize.DECIMAL(9, 2),
      allowNull: false,
      validate: {
        isGreaterThan(value) {
          if (parseFloat(value) < 0) {
            throw new Error('Error! Price should be positive number');
          } else if (parseFloat(value) == 0) {
            throw new Error('Error! Price should be greater than zero');
          }
        }
      }
    },
    unit_weight: {
      type: Sequelize.DECIMAL(9, 3),
      allowNull: false,
      validate: {
        isGreaterThan(value) {
          if (parseFloat(value) < 0) {
            throw new Error('Error! Weight should be positive number');
          } else if (parseFloat(value) == 0) {
            throw new Error('Error! Weight should be greater than zero');
          }
        }
      }
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  });

  return Product;
};