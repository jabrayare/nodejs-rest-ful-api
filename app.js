const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
//Imports Post route and use it as a middle ware
const postsRoutes = require("./ROUTES/posts");
const userPosts = require("./ROUTES/user");
// ROUTES
app.use("/post", postsRoutes);
// app.use("/post", postsRoutes);
// Middlewares -> Funcations that run when a certain route is hit.
app.use("/user", userPosts);

//PORT
const PORT = 3000;

//Connecting to MangoDB.
mongoose
  .connect(process.env.DB_CONNECTION)
  .then((res) =>
    app.listen(PORT, () =>
      console.log(`Db connected\nListening on port: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err));
