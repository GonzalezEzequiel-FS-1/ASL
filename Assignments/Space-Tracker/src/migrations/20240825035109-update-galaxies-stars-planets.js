'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Stars', 'galaxyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Galaxies',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.createTable('PlanetStars', {
      planetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Planets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      starId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stars', 'galaxyId');
    await queryInterface.dropTable('PlanetStars');
  }
};

