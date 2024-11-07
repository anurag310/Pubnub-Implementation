const PubNubService = require('../services/pubnubService');

const publishMessage = async (req, res) => {
    const { channel, message } = req.body;

    try {
        await PubNubService.publishMessage(channel, message);
        res.status(200).send({ success: true, message: 'Message published successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error publishing message', error });
    }
};

const subscribeToChannel = (req, res) => {
    const { channel } = req.params;

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Subscribe to the PubNub channel
    PubNubService.subscribeToChannel(channel, (message) => {
        // Send each received message to the client in real-time
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    });

    // Clean up when the client disconnects
    // req.on('close', () => {
    //     PubNubService.unsubscribeFromChannel(channel);
    //     res.end();
    // });
};


module.exports = { publishMessage, subscribeToChannel};
