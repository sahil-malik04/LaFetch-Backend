"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        name: "ADMIN",
        permissions: [""],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VENDOR",
        permissions: [""],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
