const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const product = {
    name: req.body.name,
    description: req.body.description,
    unit_price: req.body.unit_price,
    unit_weight: req.body.unit_weight,
    category_id: req.body.category_id,
  };

  Product.create(product)
    .then(data => {
      res.json({
        message: "Product inserted"});
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

exports.findAll = (req, res) => {

  Product.findAll({ include: ["category"]})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Product with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Product was updated successfully."
        });
      } else {
        res.status(404).json({
          message: `Cannot update Product with id=${id}. Is the same or not exist in database.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating Product with id=" + id
      });
    });
};
