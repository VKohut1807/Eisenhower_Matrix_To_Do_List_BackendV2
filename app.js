const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require("./templates/routers");
const serverPort = process.env.PORT || 4000;
const cors = require('cors');
const morgan = require('morgan');

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use("/", router);

app.listen(serverPort, () => console.log(`serwer work on port: ${serverPort}`));

