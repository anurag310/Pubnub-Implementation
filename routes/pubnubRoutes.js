const express = require('express');
const { getChannelOccupancy,publishMessage, subscribeToChannel,setUUIDMetadata, getUUIDMetadata,getChannelMetadata, startConvo, oneToOneSendMssg, fetchMessage} = require('../controllers/pubnubController');
const router = express.Router();

router.post('/publish', publishMessage);
router.get('/subscribe/:channel', subscribeToChannel);
router.post('/set-uuid-metadata',setUUIDMetadata);
router.post('/getUUIDMetadata',getUUIDMetadata);
router.post('/getChannelMetadata',getChannelMetadata);

router.post('/start-convo', startConvo);
router.get('/getChannelOccupancy',getChannelOccupancy);
router.get('/fetchMessage',fetchMessage);
  
  // Route to send a message from one user to the other
  router.post('/send-message', oneToOneSendMssg);
module.exports = router;
