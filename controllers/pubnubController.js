const PubNubService = require('../services/pubnubService');

// pubnub.objects.getUUIDMetadata({
//     uuid: "uuid-1",
// })

const getUUIDMetadata = async (req,res)=>{
    const {uuid} = req.body;
    try{
        const response = await PubNubService.getUUIDMetadata(uuid);
        res.status(200).json({
            status: 200,
            data: response
        });
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Failed to set UUID metadata', err });
    }
}
const getChannelMetadata = async (req,res)=>{
    const {channelName} = req.body;
    try{
        const response = await PubNubService.getChannelMetadata(channelName);
        res.status(200).json({
            status: 200,
            data: response
        });
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Failed to set Channel metadata', err });
    }
}

 const setUUIDMetadata = async (req, res) => {
    const { uuid = null, name } = req.body; // Default uuid to null if not provided

    try {
        const pubnubResponse = await PubNubService.setUUIDMetadata(uuid, name);
        
        // Send the full response back to the client
        res.status(200).json({
            status: 200,
            data: pubnubResponse
        });
        //res.status(200).json({ success: true, message: 'UUID metadata set successfully!' });
    } catch (error) {
        console.error("Error setting UUID metadata:", error);
        res.status(500).json({ success: false, message: 'Failed to set UUID metadata', error });
    }
};
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


const startConvo = async (req, res) => {
    try {
      const { username1, username2 } = req.body;
      // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
       await PubNubService.startConversation(username1, username2,(message) => {
        // Send each received message to the client in real-time
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const oneToOneSendMssg = async (req, res) => {
    try {
      const { userId, channel, text } = req.body;
      
   await PubNubService.sendMessage(userId, channel, text);
      res.status(200).send({ success: true, message: 'Message published successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getChannelOccupancy = async(req,res)=>{
    try{
        const {channel} = req.body;
        var result = await PubNubService.getChannelOccupancy(channel);
        res.status(200).json(result);
    }
    catch(error){ res.status(500).json({ error: error.message });}
  }
  const fetchMessage = async (req,res)=>{
    try{
        const {channel} = req.body;
        var result = await PubNubService.fetchMesssage(channel);
        res.status(200).json(result);
    }
    catch(error){ res.status(500).json({ error: error.message });}
  }

module.exports = {fetchMessage, getChannelOccupancy,publishMessage, subscribeToChannel,setUUIDMetadata,getUUIDMetadata,oneToOneSendMssg,getChannelMetadata,startConvo};
