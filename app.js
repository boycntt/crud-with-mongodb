const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const tradeRouter = require("./routes/TradeRoutes");
require('dotenv').config();

const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);
app.use("/api/trades", tradeRouter);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(process.env.PORT||3001, () => {
  console.log(`Server is running on port ${process.env.PORT||3001}`);
});

module.exports = app;
