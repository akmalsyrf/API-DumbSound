const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const uploadImage = require("../middlewares/uploadImage");
const uploadMusic = require("../middlewares/uploadMusic");

const { register, login, checkAuth } = require("../controllers/auth");
router.get("/check-auth", auth, checkAuth);
router.post("/register", register);
router.post("/login", login);

const { getAllPayment, addPayment, approvePayment, rejectPayment, getPaymentStatusByIdUser } = require("../controllers/payment");
router.get("/payments", getAllPayment);
router.get("/paymentStatus", auth, getPaymentStatusByIdUser);
router.post("/payment", auth, uploadImage("attache"), addPayment);
router.patch("/approvePayment/:id", auth, approvePayment);
router.patch("/rejectPayment/:id", auth, rejectPayment);

const { addArtist, getAllArtist } = require("../controllers/artist");
router.get("/artists", getAllArtist);
router.post("/artist", auth, addArtist);

const { getAllMusic, addMusic } = require("../controllers/music");
router.get("/musics", getAllMusic);
router.post("/music", auth, uploadMusic(["attache", "thumbnail"]), addMusic);

module.exports = router;
