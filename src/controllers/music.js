const { music, artist } = require("../../models");

exports.getAllMusic = async (req, res) => {
  try {
    const data = await music.findAll({
      include: [
        {
          model: artist,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "DESC"]],
      attributes: { exclude: ["idArtist", "createdAt", "updatedAt"] },
    });
    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.addMusic = async (req, res) => {
  console.log(req.users);
  // console.log(req.files.thumbnail[0].filename);
  // console.log(req.files.attache[0].filename);
  try {
    const data = await music.create({
      ...req.body,
      attache: req.files.attache[0].filename,
      thumbnail: req.files.thumbnail[0].filename,
    });
    const value = data.dataValues;
    const artistData = await artist.findOne({
      where: { id: value.idArtist },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const response = {
      id: value.id,
      title: value.title,
      thumbnail: value.thumbnail,
      year: value.year,
      attach: value.attach,
      artist: artistData,
    };
    res.status(200).send({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
