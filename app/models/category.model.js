module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.TEXT('tiny')
    }
  });

  return Category;
};