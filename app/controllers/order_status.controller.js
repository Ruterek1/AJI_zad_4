const db = require("../models");
const OrderStatus = db.order_status;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const order_status_name = req.query.order_status_name;
  var condition = order_status_name ? { order_status_name: { [Op.like]: `%${order_status_name}%` } } : null;

  OrderStatus.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order Status."
      });
    });
};
