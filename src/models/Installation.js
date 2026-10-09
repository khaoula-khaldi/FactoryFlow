const mongoose = require("mongoose");
 const InstallationSchema = new mongoose.Schema({
     installed: {
        type: Boolean,
        required: true,
        default: false
    },
    dateInstallation: { 
        type: Date 
    } 
    });
 module.exports = mongoose.model("Installation", InstallationSchema);
