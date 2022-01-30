const { payment, user } = require("../../models");

exports.getAllPayment = async (req, res) => {
  try {
    const data = await payment.findAll({
      include: [
        {
          model: user,
          as: "userId",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["idUser", "updatedAt"] },
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

exports.getPaymentStatusByIdUser = async (req, res) => {
  try {
    const data = await payment.findOne({
      where: { idUser: req.users.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).send({
      status: "success",
      data: data.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.addPayment = async (req, res) => {
  console.log(req.users);

  //date handling
  const date = new Date();
  const numberOfDaysToAdd = 30;
  const result = date.setDate(date.getDate() + numberOfDaysToAdd);
  const dueDate = new Date(result);
  const readyDueDate = dueDate.toISOString().slice(0, 19).replace("T", " ");
  console.log(readyDueDate);
  try {
    const paymentExist = await payment.findOne({
      where: { idUser: req.users.id },
    });

    if (paymentExist) {
      if (paymentExist.status === "Approve" || paymentExist.status === "Pending") {
        return res.send({
          status: "error",
          message: `You have been made the payment, your payment status is ${paymentExist.status}`,
        });
      }
    }

    const data = await payment.create({
      status: "Pending",
      attache: req.file.filename,
      dueDate: readyDueDate,
      idUser: req.users.id,
    });
    const value = data.dataValues;

    const userData = await user.findOne({
      where: { id: req.users.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const response = {
      id: value.id,
      startDate: value.createdAt,
      dueDate: value.dueDate,
      userId: { ...userData.dataValues, subscribe: false },
      attache: value.attache,
      status: value.status,
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

exports.approvePayment = async (req, res) => {
  try {
    const responsePayment = await payment.update({ status: "Approved" }, { where: { id: req.params.id } });
    const responseUser = await user.update({ subscribe: 1 }, { where: { id: req.users.id } });
    res.status(200).send({
      status: "success",
      data: { responsePayment, responseUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.rejectPayment = async (req, res) => {
  try {
    const responsePayment = await payment.update({ status: "Cancel" }, { where: { id: req.params.id } });
    const responseUser = await user.update({ subscribe: 0 }, { where: { id: req.users.id } });
    res.status(200).send({
      status: "success",
      data: { responsePayment, responseUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
