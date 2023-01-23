module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
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

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'salesId',
      as: 'products',
      through: SaleProduct,
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'sales',
      through: SaleProduct,
      otherKey: 'salesId',
    });
  };

  return SaleProduct;
};
