const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model.js")(sequelize, Sequelize);
db.order_status = require("./order_status.model.js")(sequelize, Sequelize);
db.order_main = require("./order_main.model.js")(sequelize, Sequelize);
db.order_details = require("./order_details.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);

db.category.hasMany(db.product, {
  foreignKey: "category_id",
  as: "product"
});

db.product.belongsTo(db.category, {
  foreignKey: "category_id",
  as: "category"
});

db.order_status.hasMany(db.order_main, {
  foreignKey: "order_status_id",
  as: "order_main"
});

db.order_main.belongsTo(db.order_status, {
  foreignKey: "order_status_id",
  as: "order_status"
});

db.product.belongsToMany(db.order_main, {
  foreignKey: 'product_id',
  as: 'order_main',
  through: 'order_details'  
});

db.order_main.belongsToMany(db.product, {
  foreignKey: 'order_main_id',
  as: 'product',
  through: 'order_details'  
});

module.exports = db;