"use strict";

const { artist } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    // get Artist from database for relations data
    const dataArtist = await artist.findAll();

    // function for get id from data artis
    const getIdArtist = (name) => {
      return dataArtist.filter((data) => data.name === name)[0].id;
    };
    await queryInterface.bulkInsert("music", [
      {
        title: "Circles",
        year: 2020,
        thumbnail: "circles.png",
        attache: "circles.mp3",
        idArtist: getIdArtist("Post Malone"),
      },
      {
        title: "Logic",
        year: 2020,
        thumbnail: "logic.png",
        attache: "logic.mp3",
        idArtist: getIdArtist("Keanu Reeves"),
      },
      {
        title: "Godzilla",
        year: 2020,
        thumbnail: "godzilla.png",
        attache: "godzilla.mp3",
        idArtist: getIdArtist("Eminem"),
      },
      {
        title: "Never Ever",
        year: 2020,
        thumbnail: "never-ever.png",
        attache: "never-ever.mp3",
        idArtist: getIdArtist("Eminem"),
      },
      {
        title: "Love U Better",
        year: 2020,
        thumbnail: "love-u-better.png",
        attache: "love-u-better.mp3",
        idArtist: getIdArtist("Ty Dolla $ign"),
      },
      {
        title: "Tragic",
        year: 2020,
        thumbnail: "tragic.png",
        attache: "tragic.mp3",
        idArtist: getIdArtist("QG"),
      },
      {
        title: "Midsummer Madness",
        year: 2020,
        thumbnail: "midsummer-madness.png",
        attache: "midsummer-madness.mp3",
        idArtist: getIdArtist("88Rising"),
      },
      {
        title: "Slow Dancing in the Dark",
        year: 2020,
        thumbnail: "slow-dancing-in-the-dark.png",
        attache: "slow-dancing-in-the-dark.mp3",
        idArtist: getIdArtist("Joji"),
      },
      {
        title: "History",
        year: 2020,
        thumbnail: "history.png",
        attache: "history.mp3",
        idArtist: getIdArtist("Rich Brian"),
      },
      {
        title: "I Like U",
        year: 2020,
        thumbnail: "i-like-u.png",
        attache: "i-like-u.mp3",
        idArtist: getIdArtist("NIKI"),
      },
      {
        title: "Love Galore",
        year: 2020,
        thumbnail: "love-galore.png",
        attache: "love-galore.mp3",
        idArtist: getIdArtist("SZA"),
      },
      {
        title: "End of The Road",
        year: 2020,
        thumbnail: "end-of-the-road.png",
        attache: "end-of-the-road.mp3",
        idArtist: getIdArtist("Boyz II Men"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
