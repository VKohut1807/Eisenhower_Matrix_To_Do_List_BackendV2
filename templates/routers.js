const express = require("express");
const controllers = require("./controllers");
const router = express.Router();
const multer = require('multer');
const multerConfig = require("../templates/multerConfig");

router.use(multer({ storage: multerConfig.storageConfig, fileFilter: multerConfig.fileFilter }).single("fileImage"));

router.post("/login", controllers.login);
router.post("/registration", controllers.registr);
router.delete("/logout", controllers.logout);
router.get("/user", controllers.user_get);

router.get("/tasks", controllers.tasks_get);
router.post("/tasks", controllers.task_add);
router.put("/tasks", controllers.task_put);
router.delete("/tasks", controllers.task_del);
router.post("/tasks/file", controllers.task_uploadsImg);

module.exports = router;