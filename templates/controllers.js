
const mongoose = require("mongoose");
const db = require("../db");
const Task = db.task;
const User = db.user;
const basicElements = require("./basicElements");

class controllers {
    async registr(req, res) {
        const user = new User(req.body)
        const newUser = await User.findOne({ email: user.email })
        if (newUser === null) {
            await user.save()
                .then((result) => {
                    console.log("registrUser", result);
                    res.status(200).json({ message: `user name - "${result.name}" created`, reg: true });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ message: err });
                    mongoose.disconnect();
                });
        } else {
            res.json({ message: "user is already registered" });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const randomHash = basicElements.randomString(16);
        await User.findOneAndUpdate({ email: email, password: password }, { hash: randomHash }, { new: true })
            .then(user => {
                console.log("loginUser", user);
                if (user !== null) {
                    res.cookie('hash', randomHash)
                    res.cookie('id', user.id)
                    res.status(200).json({ log: true, message: `welcome "${user.name}"` });
                } else {
                    res.json({ message: "user not found" });
                }
            })
    }
    async logout(req, res) {
        let cookie = Object.keys(req.cookies);
        if (cookie.includes("id", "hash")) {
            for (let prop in req.cookies) {
                res.clearCookie(prop);
            }
            return res.status(200).json({ message: "Logout successful", logout: true })
        }
        else {
            return res.json({ message: "User not found" });
        }
    }
    async user_get(req, res) {
        await User.findOne({ _id: req.cookies.id, hash: req.cookies.hash })
            .then(user => {
                console.log("user", user);
                if (user === null) {
                    res.status(200).send({ message: "without User" });
                } else {
                    const logUser = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                    res.status(200).send({ message: " logged in", logUser });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: err });
                mongoose.disconnect();
            });
    }

    async tasks_get(req, res) {
        await Task.find({})
            .then(tasks => {
                console.log("getTasks", tasks);
                res.status(200).send(tasks);
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_add(req, res) {
        if (req.body.avatar.size > 0) {
            const imgUrl = await req.body.avatar;
            imgUrl.url = `http://localhost:4000/public/img/${imgUrl.name}`;
        }
        const task = new Task(req.body)
        await task.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({ message: `task name - "${result.name}" added` });
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_put(req, res) {
        const changedTask = req.body;
        if (req.body.avatar.size > 0) {
            const oldTaskAvatarName = await Task.findOne({ _id: changedTask._id });
            if (oldTaskAvatarName.avatar.name !== changedTask.avatar.name) {
                basicElements.deleteFile(oldTaskAvatarName.avatar.name, basicElements.fileImgPath);
            }
            changedTask.avatar.url = `http://localhost:4000/public/img/${changedTask.avatar.name}`;
        } else {
            const oldTaskAvatarName = await Task.findOne({ _id: changedTask._id });
            basicElements.deleteFile(oldTaskAvatarName.avatar.name, basicElements.fileImgPath);
        }
        await Task.findOneAndUpdate({ _id: changedTask._id }, changedTask, { new: true })
            .then((result) => {
                console.log(result);
                res.status(200).json({ message: `task name - "${result.name}" changed` });
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_del(req, res) {
        const id = req.body;
        await Task.findByIdAndDelete(id)
            .then((result) => {
                if (result.avatar.size > 0) {
                    basicElements.deleteFile(result.avatar.name, basicElements.fileImgPath);
                }
                res.status(200).json({
                    message: `task name - "${result.name}" deleted`
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: err });
                mongoose.disconnect();
            });
    }
    async task_uploadsImg(req, res) {
        let filedata = await req.file;
        if (filedata) {
            res.status(200).json({ message: "File loaded" });
        }
        else {
            res.json({ message: "File upload error" });
        }
    }
}

module.exports = new controllers();