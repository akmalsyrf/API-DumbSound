const { music, artist } = require("../../models");

const cloudinary = require("../utils/cloudinary");

exports.getAllMusic = async (req, res) => {
  try {
    let data = await music.findAll({
      include: [
        {
          model: artist,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["idArtist", "createdAt", "updatedAt"] },
    });
    // make filtering data by query params
    if (req.query.title) {
      data = data.filter((item) => item.title.toLowerCase().includes(req.query.title.toLowerCase()));
    }
    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return { ...item, thumbnail: process.env.PATH_IMAGE + item.thumbnail, attache: process.env.PATH_MUSIC + item.attache };
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
  console.log(req.files.attache[0].path);
  try {
    const resultThumbnail = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
      folder: "DumbSound",
      use_filename: true,
      unique_filename: false,
    });
    const resultMP3 = await cloudinary.uploader.upload(req.files.attache[0].path, {
      resource_type: "video",
      folder: "DumbSound",
      use_filename: true,
      unique_filename: false,
    });
    const data = await music.create({
      ...req.body,
      attache: resultMP3.public_id,
      thumbnail: resultThumbnail.public_id,
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
