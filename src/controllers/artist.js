const { artist } = require("../../models");

exports.getAllArtist = async (req, res) => {
  try {
    const data = await artist.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.addArtist = async (req, res) => {
  console.log(req.users);
  const { name, old, type, startCareer } = req.body;
  try {
    const data = await artist.create({ name, old, type, startCareer });
    const response = {
      id: data.id,
      name: data.name,
      old: data.old,
      type: data.type,
      startCareer: data.startCareer,
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
