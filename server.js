//https://www.youtube.com/watch?v=SLpUKAGnm-g
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
///
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("./index", { shortUrls: shortUrls });
  //console.log("raiz ok");
});
app.post("/shortUrls", async (req, res) => {
  console.log("acessou");
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
//////
app.listen(process.env.PORT || 5000);
