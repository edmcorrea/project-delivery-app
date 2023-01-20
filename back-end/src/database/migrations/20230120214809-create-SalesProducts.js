'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      salesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'sales_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'product_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('sales_products');
  }
};
