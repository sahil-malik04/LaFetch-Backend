"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,
        name: "ADMIN",
        permissions: [""],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "VENDOR",
        permissions: [""],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "USER",
        permissions: [""],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
