module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    salesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      foreignKey: 'salesId',
      as: 'products',
      through: SalesProducts,
      otherKey: 'productId',
    });

    models.Products.belongsToMany(models.Sales, {
      foreignKey: 'productId',
      as: 'sales',
      through: SalesProducts,
      otherKey: 'salesId',
    });
  };

  return SalesProducts;
};