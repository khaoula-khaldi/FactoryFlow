require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const installationRoutes = require("./routes/installationRoutes");
const authRoutes = require("./routes/utilisateurRoutes");
const matierePremiereRoutes = require("./routes/matierePremiereRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "FactoryFlow API fonctionne"
    });
});

app.use("/api/install", installationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/matieres-premieres", matierePremiereRoutes);

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`FactoryFlow API running on port ${PORT}`);
    });
};

startServer();