require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "FactoryFlow API fonctionne"
    });
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`FactoryFlow API running on port ${PORT}`);
    });
};

startServer();