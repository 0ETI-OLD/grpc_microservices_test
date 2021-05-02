const express = require("express");
const { loliRouter } = require("./features/loli/loliRouter");
const app = express();

app.use(require("body-parser").json());

app.get("/", (req, res) => {
  res.send("API GATEWAY");
});

app.use("/lolis", loliRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("API GATEWAY ONLINE");
});
