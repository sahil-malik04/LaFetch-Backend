const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const users = require("./userModel");

const user_addresses = sequelize.define("user_addresses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  line1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  line2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDefaultAddress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
});

user_addresses.belongsTo(users, { foreignKey: "userId" });

// sequelize.sync({ force: false }).then(() => {
//     console.log('user_addresses table created successfully.');
// })
//     .catch(err => {
//         console.error('Error creating table:', err);
//     });

module.exports = user_addresses;
