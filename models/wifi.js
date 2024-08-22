const mongoose = require('mongoose');


const wifiSchema = new mongoose.Schema({
    data:{
        type:Object,
        require:true
    }
})

const wifiFolder = mongoose.model('allwifi',wifiSchema );

module.exports = wifiFolder;