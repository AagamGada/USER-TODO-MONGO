const User = require("../models/user");
const Todo = require("../models/todo");

module.exports = {
    async createUser(req,res){
        try{
            const newUser = new User( req.body );
            let user = await newUser.save();
            const newTodo = new Todo({user_id: user._id});
            let todo = await newTodo.save();
            res.status(201).send(user);
        }   
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    },
    async createTask(req,res){
        try{
            let task = req.body;
            const user = await User.findOne({"email": req.params.email});
            const todo = await Todo.findOne({"user_id":user._id});
            todo.todos.push(task);
            await todo.save();
            res.status(201).send("Task Added");
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async getAllTask(req,res){
        try{
            const user = await User.findOne({"email":req.params.email});
            const todo = await Todo.findOne({"user_id":user._id});
            var allTask = [];
            todo.todos.forEach(element => {
                allTask.push(element.task);
            });
            res.status(201).send(allTask);
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async getParticularTask(req,res){
        try{
            const user = await User.findOne({"email":req.params.email});
            const todo = await Todo.findOne({"user_id":user._id});
            todo.todos.forEach(element => {
                if(element._id == req.params.id){
                    res.status(201).send(element.task);
                }
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async editTask(req,res){
        try{
            const user = await User.findOne({"email":req.params.email});
            var updatedTask = req.body.task;
            const query = { "user_id": user._id, "todos._id": req.params.id };
            const updateDocument = {
              $set: { "todos.$.task": updatedTask}
            };
            const result = await Todo.updateOne(query, updateDocument);
            res.status(201).send("Task Updated");
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async deleteUser(req,res){
        try{
            const user = await User.findOne({"email":req.params.email});
            const todo = await Todo.deleteOne({"user_id":user._id});
            const deleteUser = await User.deleteOne({"email":req.params.email});
            res.status(201).send("User Deleted");
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async deleteTask(req,res){
        try{
            const user = await User.findOne({"email":req.params.email});
            const todo = await Todo.findOne({"user_id":user._id});
            console.log(todo);
            let index = todo.todos.findIndex(function (data) {
                return data._id === req.params.id;
            });
            todo.todos.splice(index, 1);
            await todo.save();
            res.status(201).send("Task Deleted");
        }
        catch(err){
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
}