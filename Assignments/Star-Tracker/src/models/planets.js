'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planets extends Model {
    static associate(models) {
      Planets.belongsToMany(models.Stars, {
        through: "PlanetStars",
        foreignKey: 'planetId',
        otherKey: 'starId',
        as: 'stars',
      });
    }
  }

  Planets.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Planets',
    }
  );

  return Planets;
};

