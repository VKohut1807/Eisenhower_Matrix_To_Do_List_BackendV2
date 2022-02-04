const express = require("express");
const controllers = require("./controllers");
const router = express.Router();

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

router.get("/tasks", controllers.tasks_get);
router.post("/tasks", controllers.task_add);
router.put("/tasks", controllers.task_put);
router.delete("/tasks", controllers.task_del);

module.exports = router;