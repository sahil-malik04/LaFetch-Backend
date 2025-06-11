"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("cities", [
      {
        id: 1,
        stateId: 10,
        name: "Gurgaon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        stateId: 14,
        name: "Bangalore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        stateId: 7,
        name: "Gaziyabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        stateId: 25,
        name: "Mohali",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        stateId: 25,
        name: "Chandigarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        stateId: 36,
        name: "Kolkata",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        stateId: 14,
        name: "Mysore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        stateId: 28,
        name: "Chennai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        stateId: 36,
        name: "Siliguri",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        stateId: 24,
        name: "Bhubaneshwar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        stateId: 28,
        name: "Tirunelveli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        stateId: 15,
        name: "Kochi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        stateId: 14,
        name: "Mangalore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        stateId: 36,
        name: "Asansol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        stateId: 14,
        name: "Udupi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        stateId: 16,
        name: "Pune",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        stateId: 34,
        name: "PONDICHERRY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        stateId: 14,
        name: "Bellary",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        stateId: 1,
        name: "Delhi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        stateId: 36,
        name: "South 24 Parganas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        stateId: 14,
        name: "Gonikoppal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        stateId: 8,
        name: "Surat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        stateId: 8,
        name: "Ahmedabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        stateId: 16,
        name: "Mumbai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        stateId: 26,
        name: "Udaipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        stateId: 7,
        name: "Noida",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        stateId: 17,
        name: "Raipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        stateId: 28,
        name: "Kanyakumari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 29,
        stateId: 10,
        name: "Bahadurgarh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        stateId: 28,
        name: "Coimbatore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        stateId: 10,
        name: "Faridabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        stateId: 26,
        name: "Jaipur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        stateId: 7,
        name: "Ghaziabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        stateId: 36,
        name: "Bankura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 35,
        stateId: 1,
        name: "TESTS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 36,
        stateId: 1,
        name: "New Delhi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 37,
        stateId: 7,
        name: "Lucknow",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 38,
        stateId: 16,
        name: "Nagpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 39,
        stateId: 10,
        name: "Gurugram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 40,
        stateId: 14,
        name: "Mysuru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 41,
        stateId: 28,
        name: "Madurai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 42,
        stateId: 14,
        name: "Bengaluru Rural",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 43,
        stateId: 8,
        name: "Rajkot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 44,
        stateId: 26,
        name: "Jodhpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 45,
        stateId: 14,
        name: "Hubballi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 46,
        stateId: 36,
        name: "Howrah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 47,
        stateId: 7,
        name: "Kanpur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 48,
        stateId: 7,
        name: "Varanasi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 49,
        stateId: 8,
        name: "Gandhinagar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 50,
        stateId: 5, // Assam
        name: "Kamrup",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 51,
        stateId: 11, // Himachal Pradesh
        name: "Mandi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 52,
        stateId: 11, // Himachal Pradesh
        name: "Sundar Nagar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 53,
        stateId: 7, // Uttar Pradesh
        name: "SAHIBABAD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 54,
        stateId: 13, // Madhya Pradesh
        name: "GUNA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 55,
        stateId: 16, // Maharashtra
        name: "Aurangabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 56,
        stateId: 5, // Assam
        name: "Nalbari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 57,
        stateId: 4, // Telangana
        name: "Hyderabad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 58,
        stateId: 14, // Karnataka
        name: "Kodagu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 59,
        stateId: 14, // Karnataka
        name: "Davangare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 60,
        stateId: 14, // Karnataka
        name: "Karwar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 61,
        stateId: 8, // Gujarat
        name: "Vadodara",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 62,
        stateId: 11, // Himachal Pradesh
        name: "MANALI",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 63,
        stateId: 7, // Uttar Pradesh
        name: "GREATER NOIDA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 64,
        stateId: 14, // Karnataka
        name: "Bangalore Rural",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 65,
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
