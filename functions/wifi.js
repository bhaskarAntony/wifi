const { getWiFiProfiles } = require("../hack");
const wifiFolder = require("../models/wifi");


const storeWifiData = async(req, res) =>{
   try{
    const newdata = await  getWiFiProfiles();
    
    if(newdata && newdata.length>0){
        const newWifidata = wifiFolder({data:newdata});
        newWifidata.save();
        res.status(200).json({
            message:'success',
            wifidata:newWifidata
        })
    }else{
          res.status(404).json({
            message:"No wifi data found",
          wifidata:[]
    })
    }
   }catch(err){
    res.status(404).json({
        message:err.message,
        wifidata:err
})
   }
}


const getWifiList = async(req, res) =>{
    try{
        const alldata = await wifiFolder.find();
        res.status(200).json(
            {
                message:"success",
                data:alldata
            }
        )

    }catch(err){
        res.status(500).json({
            message:"Error",
            data:err
        })
    }
}

module.exports = {storeWifiData, getWifiList}