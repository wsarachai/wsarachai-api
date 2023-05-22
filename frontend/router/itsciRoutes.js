const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  bootstrap.init();
  bootstrap.initDefault();
  next();
});

router.get("/", (req, res) => {
  res.render(theme.getPageViewPath("itscis", "index"), {
    currentLayout: theme.getLayoutPath("default"),
  });
});

module.exports = router;
