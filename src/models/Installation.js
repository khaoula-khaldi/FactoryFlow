const mongoose = require("mongoose");

const InstallationSchema = new mongoose.Schema({
    Installed:{
        type:Boolean,
        require:true,
        default:false
    },
    DateInstallation:{
        type:Date
    }

});
module.exports = mongoose.model("Installation",InstallationSchema);

