"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullName: "admin",
        email: "admin@gmail.com",
        password: "U2FsdGVkX19C/EwPED68iz/hYUnc4m2+QG7+U/NLXCk=",
        roleId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
