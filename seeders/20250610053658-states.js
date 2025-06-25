"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("states", [
      {
        countryId: 1,
        name: "Delhi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Andhra Pradesh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Arunachal Pradesh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Telangana",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Assam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Bihar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Uttar Pradesh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Gujarat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Goa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Haryana",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Himachal Pradesh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Jammu and Kashmir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Madhya Pradesh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Karnataka",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Kerala",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Maharashtra",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Chattisgarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Daman and Diu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Dadra and Nagar Haveli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Manipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Megalaya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Mizoram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Nagaland",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Odisha",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Punjab",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Rajasthan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Sikkim",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Tamil Nadu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Tripura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Jharkhand",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Uttarakhand",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Lakshadweep",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Chandigarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Pondicherry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "Andaman and Nicobar Islands",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        countryId: 1,
        name: "West Bengal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("states", null, {});
  },
};
