"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("users", [
      {
        fullname: "Admin",
        email: "admin@mail.com",
        password: hashedPassword,
        gender: "Male",
        phone: "08179187676",
        address: "Earth",
        listAs: "1",
        subscribe: "1",
      },
      {
        fullname: "User",
        email: "user@mail.com",
        password: hashedPassword,
        gender: "Male",
        phone: "08179187676",
        address: "Earth",
        listAs: "0",
        subscribe: "0",
      },
    ]);

    await queryInterface.bulkInsert("artists", [
      {
        name: "Post Malone",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "Keanu Reeves",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "Eminem",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "Ty Dolla $ign",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "QG",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "88Rising",
        old: 24,
        type: "Band",
        startCareer: 2020,
      },
      {
        name: "Joji",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "Rich Brian",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "NIKI",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "SZA",
        old: 24,
        type: "Solo",
        startCareer: 2020,
      },
      {
        name: "Boyz II Men",
        old: 24,
        type: "Band",
        startCareer: 2020,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
