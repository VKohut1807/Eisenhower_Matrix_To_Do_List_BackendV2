const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/";
const dataBase = "tasks_matrix"
const Task = require("./taskScheme");

mongoose.connect(`${url}${dataBase}`, { useUnifiedTopology: true, useNewUrlParser: true });
module.exports = {
    task: Task,
}