const express = require("express");
const User = require("../models/User");
const getWeatherByCity = require("../services/weatherService");

const router = express.Router();

/* CREATE USER */
router.post("/", async (req, res) => {
  try {
    const { name, email, city } = req.body;

    const user = await User.create({ name, email, city });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET ALL USERS */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("_id name");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET USER BY ID + WEATHER */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const weather = await getWeatherByCity(user.city);

    res.json({
      user,
      weather,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
