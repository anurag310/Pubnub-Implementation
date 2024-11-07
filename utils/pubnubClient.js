const PubNub = require('pubnub');

const pubnub = new PubNub({
    publishKey: "pub-c-04fb2191-8084-4ae5-907f-3b1a7f3f3c1b",
    subscribeKey: "sub-c-dbfeaea0-7291-484c-b56d-df3fbdffa520",
    userId: "myUniqueUserId",
});

module.exports = pubnub;
