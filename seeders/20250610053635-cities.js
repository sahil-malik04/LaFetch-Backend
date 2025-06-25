"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("cities", [
      {
        stateId: 10,
        name: "Gurgaon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Bangalore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7,
        name: "Gaziyabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 25,
        name: "Mohali",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 25,
        name: "Chandigarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "Kolkata",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Mysore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 28,
        name: "Chennai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "Siliguri",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 24,
        name: "Bhubaneshwar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 28,
        name: "Tirunelveli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 15,
        name: "Kochi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Mangalore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "Asansol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Udupi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 16,
        name: "Pune",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 34,
        name: "PONDICHERRY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Bellary",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 1,
        name: "Delhi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "South 24 Parganas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Gonikoppal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 8,
        name: "Surat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 8,
        name: "Ahmedabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 16,
        name: "Mumbai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 26,
        name: "Udaipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7,
        name: "Noida",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 17,
        name: "Raipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 28,
        name: "Kanyakumari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        stateId: 10,
        name: "Bahadurgarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 28,
        name: "Coimbatore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 10,
        name: "Faridabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 26,
        name: "Jaipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7,
        name: "Ghaziabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "Bankura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 1,
        name: "TESTS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 1,
        name: "New Delhi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        stateId: 7,
        name: "Lucknow",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 16,
        name: "Nagpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 10,
        name: "Gurugram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Mysuru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 28,
        name: "Madurai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Bengaluru Rural",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 8,
        name: "Rajkot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 26,
        name: "Jodhpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14,
        name: "Hubballi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36,
        name: "Howrah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7,
        name: "Kanpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7,
        name: "Varanasi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 8,
        name: "Gandhinagar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 5, // Assam
        name: "Kamrup",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 11, // Himachal Pradesh
        name: "Mandi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 11, // Himachal Pradesh
        name: "Sundar Nagar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7, // Uttar Pradesh
        name: "SAHIBABAD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 13, // Madhya Pradesh
        name: "GUNA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 16, // Maharashtra
        name: "Aurangabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 5, // Assam
        name: "Nalbari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 4, // Telangana
        name: "Hyderabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14, // Karnataka
        name: "Kodagu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14, // Karnataka
        name: "Davangare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14, // Karnataka
        name: "Karwar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 8, // Gujarat
        name: "Vadodara",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 11, // Himachal Pradesh
        name: "MANALI",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 7, // Uttar Pradesh
        name: "GREATER NOIDA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 14, // Karnataka
        name: "Bangalore Rural",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stateId: 36, // West Bengal
        name: "DURGAPUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
