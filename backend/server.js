const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth"); 
const workerRoutes = require("./routes/worker");
const requestRoutes = require("./routes/maintenance_requests");
const profileRoutes = require("./routes/UserProfileauth");
//app.use("/api", profileRoutes); 

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

app.get("/", (req, res) => res.send("Backend running!"));
app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
