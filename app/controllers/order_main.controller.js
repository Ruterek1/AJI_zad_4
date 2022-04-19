const db = require("../models");
const OrderMain = db.order_main;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  
  OrderMain.findAll({ include: ["order_status", "product"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};

exports.findAllWithState = (req, res) => {
  const id = req.params.id;

  // OrderMain.findAll({
  //   include: [{
  //     model: db.order_status,
  //     as: "order_status",
  //     where: {
  //       name: {
  //         [Op. like]: id
  //       }
  //     }
  //  }]
  // })
  OrderMain.findAll({ 
    where: {
      order_status_id: id
    } 
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving Orders."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const statusNew = parseInt(status);

  OrderMain.findByPk(id)
  .then(data => {
    if (data) {
      const statusOld = parseInt(data.order_status_id);
      if (statusOld == 1 && statusNew == 2) {
        OrderMain.update({
          approval_date: db.sequelize.fn('NOW'),
          order_status_id: status
        }, {where: {id: id}})
          .then(num => {
            if (num == 1) {
              res.json({
                message: "Order was updated successfully."
              });
            } else {
              res.status(404).json({
                message: `Cannot update Order with id=${id}. Is the same or not exist in database.`
              });
            }
          })
          .catch(err => {
            res.status(500).json({
              message: "Error updating Order with id=" + id
            });
          });
      } else if (statusOld != 2) {
        if (statusOld < statusNew) {
          if ((statusNew - statusOld < 3) &&
            (statusNew - statusOld > 0)) {
            OrderMain.update({order_status_id: status},
              {where: {id: id}})
              .then(num => {
                if (num == 1) {
                  res.json({
                    message: "Order was updated successfully."
                  });
                } else {
                  res.status(404).json({
                    message: `Cannot update Order with id=${id}. Is the same or not exist in database.`
                  });
                }
              })
              .catch(err => {
                res.status(500).json({
                  message: "Error updating Order with id=" + id
                });
              });
          } else {
            res.status(401).json({
              message: "You can't change status from 'NIEZATWIERDZONE' to 'ZREALIZOWANE'"
            })
          }
        } else {
          res.status(401).json({
            message: "Error! Sequence required: 'NIEZATWIERDZONE'->'ZATWIERDZONE'->'ZREALIZOWANE' or 'NIEZATWIERDZONE'->'ANULOWANE'"
          })
        }
      } else {
        res.status(401).json({
          message: "Order status is permament: 'ANULOWANE'"
        })
      }
    } else {
      res.status(404).json({
        message: `Cannot find Order with id=${id}.`
      });
    }    
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving Order with id=" + id
    });
  });
  
};

exports.create = (req, res) => {

  // var objxd = JSON.parse(req.body);
  const obj = req.body;
  const countOfOrdersDetails = obj["order_details"].length;
  // res.json(req.body.order_main);

  const order_main = {
    approval_date: obj.approval_date,
    order_status_id: obj.order_status_id,
    username: obj.username,
    email: obj.email,
    phone_number: obj.phone_number
  };

  OrderMain.create(order_main)
    .then(data => {
      var allInvited = [];
      for (var i = 0; i < countOfOrdersDetails; i++) {
        var orderDetailsObj = {
          product_id: obj.order_details[i].product_id,
          quantity: obj.order_details[i].quantity,
          order_main_id: data.id
        }
        allInvited.push(orderDetailsObj);        
      }
      db.order_details.bulkCreate(allInvited, {
        returning: true, validate: true
      }).then(dbOrderDetails => {
        res.json({
          message: "Order inserted"
        });
      }).catch(err => {
        res.status(404).json(err);
      });
    })
    .catch(err => {
      res.status(500).json({
        status: err.status,
        message: err.message || "Some error occurred while creating the Order."
      });
    });
};
