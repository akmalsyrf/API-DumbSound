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
        thumbnail: "DumbSound/circles.png",
        attache: "DumbSound/circles.mp3",
        idArtist: getIdArtist("Post Malone"),
      },
      {
        title: "Logic",
        year: 2020,
        thumbnail: "DumbSound/logic.png",
        attache: "DumbSound/logic.mp3",
        idArtist: getIdArtist("Keanu Reeves"),
      },
      {
        title: "Godzilla",
        year: 2020,
        thumbnail: "DumbSound/godzilla.png",
        attache: "DumbSound/godzilla.mp3",
        idArtist: getIdArtist("Eminem"),
      },
      {
        title: "Never Ever",
        year: 2020,
        thumbnail: "DumbSound/never-ever.png",
        attache: "DumbSound/never-ever.mp3",
        idArtist: getIdArtist("Eminem"),
      },
      {
        title: "Love U Better",
        year: 2020,
        thumbnail: "DumbSound/love-u-better.png",
        attache: "DumbSound/love-u-better.mp3",
        idArtist: getIdArtist("Ty Dolla $ign"),
      },
      {
        title: "Tragic",
        year: 2020,
        thumbnail: "DumbSound/tragic.png",
        attache: "DumbSound/tragic.mp3",
        idArtist: getIdArtist("QG"),
      },
      {
        title: "Midsummer Madness",
        year: 2020,
        thumbnail: "DumbSound/midsummer-madness.png",
        attache: "DumbSound/midsummer-madness.mp3",
        idArtist: getIdArtist("88Rising"),
      },
      {
        title: "Slow Dancing in the Dark",
        year: 2020,
        thumbnail: "DumbSound/slow-dancing-in-the-dark.png",
        attache: "DumbSound/slow-dancing-in-the-dark.mp3",
        idArtist: getIdArtist("Joji"),
      },
      {
        title: "History",
        year: 2020,
        thumbnail: "DumbSound/history.png",
        attache: "DumbSound/history.mp3",
        idArtist: getIdArtist("Rich Brian"),
      },
      {
        title: "I Like U",
        year: 2020,
        thumbnail: "DumbSound/i-like-u.png",
        attache: "DumbSound/i-like-u.mp3",
        idArtist: getIdArtist("NIKI"),
      },
      {
        title: "Love Galore",
        year: 2020,
        thumbnail: "DumbSound/love-galore.png",
        attache: "DumbSound/love-galore.mp3",
        idArtist: getIdArtist("SZA"),
      },
      {
        title: "End of The Road",
        year: 2020,
        thumbnail: "DumbSound/end-of-the-road.png",
        attache: "DumbSound/end-of-the-road.mp3",
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
