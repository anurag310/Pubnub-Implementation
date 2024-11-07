const express = require('express');
const pubnubRoutes = require('./routes/pubnubRoutes');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/pubnub', pubnubRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
