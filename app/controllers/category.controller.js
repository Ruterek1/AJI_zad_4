const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const category_name = req.query.category_name;
  var condition = category_name ? { category_name: { [Op.like]: `%${category_name}%` } } : null;

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category."
      });
    });

};
