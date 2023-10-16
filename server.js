const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//importing mongodb connection function
const connecDB = require("./db/connect");

//importing the routes

//admin routes
const adminAuthRoutes = require("./routes/admin/auth");

//other routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/customer/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const start = async () => {
  try {
    await connecDB(process.env.MONGOURI);
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
