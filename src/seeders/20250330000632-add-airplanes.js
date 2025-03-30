'use strict';
const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: "Airbus A350",
        capacity: 430,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Douglas DC-3",
        capacity: 760,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Boeing 737",
        capacity: 240,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Boeing 747",
        capacity: 820,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Lockheed C-130 Hercules",
        capacity: 380,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Boeing B-52 Stratofortress",
        capacity: 760,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Hawker Hurricane",
        capacity: 660,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "Antonov An-225 Mriya",
        capacity: 750,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: "P-51 Mustang",
        capacity: 130,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {})
  }
};
