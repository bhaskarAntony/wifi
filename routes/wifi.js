const express = require('express');
const { storeWifiData, getWifiList } = require('../functions/wifi');
const router = express.Router();

router.post('/get/all/wifi', storeWifiData);
router.get('/wifi/list', getWifiList);


module.exports = router;