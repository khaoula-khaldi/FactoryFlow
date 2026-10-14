require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const installationRoutes = require("./routes/installationRoutes");
const authRoutes = require("./routes/utilisateurRoutes");
const matierePremiereRoutes = require("./routes/matierePremiereRoutes");
const produitRoute = require('./routes/produitRoutes');
const compositionRoutes = require("./routes/compositionRoutes");
const mouvementStockRoute = require("./routes/mouvementStockRoutes");
const ordreFabricationRoute = require("./routes/ordreFabricationRoutes");

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
app.use("/api/produits", produitRoute);
app.use("/api/compositions", compositionRoutes);
app.use('/api/mouvement',mouvementStockRoute);
app.use('/api/ordres-fabrication',ordreFabricationRoute);

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`FactoryFlow API running on port ${PORT}`);
    });
};

startServer();