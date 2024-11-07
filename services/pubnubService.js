const pubnub = require('../utils/pubnubClient');

class PubNubService {
    static async publishMessage(channel, message) {
        return pubnub.publish({
            channel: channel,
            message: message,
        });
    }

    static subscribeToChannel(channel, callback) {
        const subscription = pubnub.subscribe({
            channels: [channel],
        });

        pubnub.addListener({
            message: (messageEvent) => {
                callback(messageEvent.message);
            },
            status: (statusEvent) => {
                console.log("Status", statusEvent.category);
            },
        });

        return subscription;
    }
}

module.exports = PubNubService;
