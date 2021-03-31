const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

router.get("/not-completed", (req, res) => {
    res.render("not-completed");
});

router.get("/completed", (req, res) => {
    res.render("completed");
});

module.exports = router;