'use strict';

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

    await queryInterface.bulkInsert('Flights', [
      {
        flightNumber: "MA6081",
        airplaneId: 70,
        depertureAirportId: 'ABT',
        arrivalAirportId: 'BRI',
        arrivalTime: '2025-04-17',
        departureTime: '2025-04-16',
        price: 15000,
        totalSeats: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: "UK8080",
        airplaneId: 71,
        depertureAirportId: 'BRI',
        arrivalAirportId: 'ABT',
        arrivalTime: '2025-04-17',
        departureTime: '2025-04-16',
        price: 15000,
        totalSeats: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: "DB4045",
        airplaneId: 72,
        depertureAirportId: 'ABT',
        arrivalAirportId: 'BRI',
        arrivalTime: '2025-04-17',
        departureTime: '2025-04-16',
        price: 19000,
        totalSeats: 45,
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
  }
};
