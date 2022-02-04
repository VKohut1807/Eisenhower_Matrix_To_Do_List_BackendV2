const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const router = require("./templates/routers");
const serverPort = process.env.PORT || 4000;
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use("/", router);

app.listen(serverPort, () => console.log(`serwer work on port: ${serverPort}`));

