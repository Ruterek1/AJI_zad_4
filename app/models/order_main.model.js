module.exports = (sequelize, Sequelize) => {
  const OrderMain = sequelize.define("order_main", {
    approval_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    order_status_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    username: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        isEmpty(value) {
          if (value == "") {
            throw new Error('Error! Username cannot be empty');
          }
        }
      }
    },
    email: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        isEmpty(value) {
          if (value == "") {
            throw new Error('Error! Email cannot be empty');
          }
        },
        isEmail: true
      }
    },
    phone_number: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        isEmpty(value) {
          if (value == "") {
            throw new Error('Error! Phone number cannot be empty');
          }
        },
        isNumeric: true
      }
    }
  });

  return OrderMain;
};