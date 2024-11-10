const pubnub = require('../utils/pubnubClient');

// import { v4 as uuidv4 } from 'uuid';
const {v4 } = require("uuid");
class PubNubService {
    static async publishMessage(channel, message) {
        return pubnub.publish({
            channel: channel,
            message: message,
        });
    }
    
    static async getUUIDMetadata(uuid) {
        return await pubnub.objects.getUUIDMetadata({
            uuid: uuid
        });
    }
    static async getChannelMetadata(channelName) {
        try{
        return await pubnub.channelMetadata({
            channel: channelName,
        });
         }
    
    catch(error){
        throw new Error(`Failed to set Channel metadata: ${error.message}`);
                }
    }
    
    static async setUUIDMetadata(uuid,name){
        const finalUUID = uuid || v4();
        try {
                   return await pubnub.objects.setUUIDMetadata({
                        uuid: finalUUID,
                        data: {
                            name: name,
                        }
                    });
                } catch (error) {
                    throw new Error(`Failed to set UUID metadata: ${error.message}`);
                }
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

    static async startConversation(username1, username2,callback)  {
        if (!username1 || !username2) {
          throw new Error('Both usernames are required');
        }
      
        // Create a unique channel name based on the usernames
        const channel = `${username1}_${username2}`;
      
        // Subscribe both users to the same channel
        const subscription = pubnub.subscribe({ channels: [channel] });
      
        // Listener for incoming messages on the channel
        pubnub.addListener({
            message: (messageEvent) => {
                callback(messageEvent.message);
            },presence: (presenceEvent) => {
                if (presenceEvent.action === 'join') {
                  console.log(`${presenceEvent.uuid} joined ${channel}`);
                } else if (presenceEvent.action === 'leave' || presenceEvent.action === 'timeout') {
                  console.log(`${presenceEvent.uuid} left ${channel}`);
                }
              },
            status: (statusEvent) => {
                console.log("Status", statusEvent.category);
            },
        });
      
        return subscription;
      };

      static async sendMessage(userId, channel, text) {
        if (!userId || !channel || !text) {
          throw new Error('userId, channel, and text are required');
        }
        return pubnub.publish({
            channel: channel,
            message: text,
        });
        };

        static async getChannelOccupancy(channel) {
            const result = await pubnub.hereNow({
              channels: [channel],
              includeUUIDs: true,
              includeState: true,
            });
            
            return result.channels[channel] ? result.channels[channel].occupants : [];
          }

          static async fetchMesssage(channel){
            const result = await pubnub.fetchMessages({
                channels: [channel],
                count:1000
            });
            return result;
          }

          static async inviteUsertoOneToOneConvo(channelId,userId){
            return await pubnub.channel({
                channel: channelId,
                uuids: [{ id: userId }],
              });
          }
          static async getChannelMember(channelId,userId){
            return await pubnub.objects.getChannelMembers({
                channel: channelId
                
              });
          }
}


module.exports = PubNubService;
