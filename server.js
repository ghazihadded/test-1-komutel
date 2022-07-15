const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/UserRoute"));

app.listen(8000, () => {
  console.log("server runnig on the port: 8000");
});
