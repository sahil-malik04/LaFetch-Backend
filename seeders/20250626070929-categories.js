"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        name: "MEN",
        parentId: null,
        type: "super",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "WOMEN",
        parentId: null,
        type: "super",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ACCESSORIES",
        parentId: null,
        type: "super",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
