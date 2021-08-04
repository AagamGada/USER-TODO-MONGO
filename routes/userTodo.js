const express = require('express');
const UserController = require('../controller/userController');

const router = express.Router();

router.post("/createUser", UserController.createUser);
router.post("/createTask/:email", UserController.createTask);
router.get("/getAllTask/:email", UserController.getAllTask);
router.get("/getParticularTask/:email/:id", UserController.getParticularTask);
router.put("/editTask/:email/:id", UserController.editTask);
router.delete("/deleteTask/:email/:id", UserController.deleteTask);
router.delete("/deleteUser/:email", UserController.deleteUser);

module.exports = router;