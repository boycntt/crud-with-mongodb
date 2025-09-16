require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const tradeRouter = require("./routes/TradeRoutes");
const snippetRouter = require("./routes/SnippetRoutes");
const tradeContentRouter = require("./routes/TradeContentRoutes");
const userRouter = require("./routes/UserRoutes");
const customerRouter = require("./routes/CustomerRoutes");
const dbRouter = require("./routes/DBRoutes");
const generateKeyRouter = require('./routes/GenerateKeyRoutes');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./docs/openapi.json');
const apiKey = require('./middleware/apiKey');
require('dotenv').config();

const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);
app.use("/api/trades", tradeRouter);
app.use("/api/snippets", snippetRouter);
app.use("/api/tradecontents",tradeContentRouter );
app.use("/api/users", userRouter);
app.use("/api/customers", customerRouter);

// Swagger UI (public - use Authorize in the UI to provide credentials)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapi));

// Protect DB endpoints with API key middleware
app.use('/api/db', apiKey, dbRouter);

// Generate a single API key and write to .env
app.use('/api/generate-key', generateKeyRouter);

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
