const express = require("express");
const router = require("../src/routes/index");
const app = express();

const db = require("./models");
app.use(express.json());
// router

app.use("/zimyo", router);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
