const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth"); 
const profileRoutes = require("./routes/UserProfileauth");
const propertyRoutes = require("./routes/property");
const tenantRoutes = require("./routes/tenant");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes); 
app.use("/api/properties", propertyRoutes);
app.use("/api/tenants", tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
