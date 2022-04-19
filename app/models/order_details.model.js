module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define("order_details", {
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isGreaterThan(value) {
          if (parseInt(value) < 0) {
            throw new Error('Error! Quantity should be positive number');
          } else if (parseInt(value) == 0) {
            throw new Error('Error! Quantity should be greater than zero');
          }
        }
      }
    },
    order_main_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'order_main',
        key: 'id'
      }
    }
  });

  return OrderDetails;
};