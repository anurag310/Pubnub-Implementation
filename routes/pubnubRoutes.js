const express = require('express');
const { publishMessage, subscribeToChannel } = require('../controllers/pubnubController');
const router = express.Router();

router.post('/publish', publishMessage);
router.get('/subscribe/:channel', subscribeToChannel);


module.exports = router;
