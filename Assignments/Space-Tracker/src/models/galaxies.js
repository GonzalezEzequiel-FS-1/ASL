'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Galaxies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the association between Galaxies and Stars
      Galaxies.hasMany(models.Stars, {
        foreignKey: 'galaxyId',
        as: 'stars',
      });
    }
  }

  Galaxies.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Galaxies',
    }
  );

  return Galaxies;
};

