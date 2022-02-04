
const mongoose = require("mongoose");
const db = require("../db");
const Task = db.task;

class controllers {
    async tasks_get(req, res) {
        await Task.find({})
            .then(tasks => {
                res.status(200).send(tasks);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_add(req, res) {
        const task = new Task(req.body)
        await task.save()
            .then((result) => {
                res.status(200).json({ message: "task added" });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_put(req, res) {
        const changedTask = req.body;
        await Task.findOneAndUpdate({ _id: changedTask._id }, changedTask, { new: true })
            .then((result) => {
                res.status(200).json({ message: "task changed" });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_del(req, res) {
        const id = req.body;
        await Task.findByIdAndDelete(id)
            .then((result) => {
                res.status(200).json({ message: "task deleted" });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err });
                mongoose.disconnect();
            });
    }
}

module.exports = new controllers();