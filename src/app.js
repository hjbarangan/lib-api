const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Upskill: Library Management System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
