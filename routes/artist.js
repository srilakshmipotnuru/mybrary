const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");

//all artist
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const artist = await Artist.find(searchOptions);
    res.render("artist/index", { artist: artist, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
}); // root of the application, home page?

//single artist
router.get("/new", (req, res) => {
  res.render("artist/new", { artist: new Artist() });
});
//create artist
router.post("/", (req, res) => {
  const artist = new Artist({
    name: req.body.name,
  });
  artist
    .save()
    .then((newArtist) => {
      res.render("artist");
    })
    .catch((err) => {
      res.render("artist/new", {
        artist: artist,
        errorMessage: "Error creating artist",
      });
    });
});
module.exports = router;
