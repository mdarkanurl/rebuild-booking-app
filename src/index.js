const express = require('express');
const app = express();

const { serverConfig } = require('./config/index.js');
const apiRoutes = require('./routes');
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(serverConfig.PORT, () => {
    console.log(`http://localhost:${serverConfig.PORT}`);
});