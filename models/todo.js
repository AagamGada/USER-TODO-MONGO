const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        "user_id": {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        "todos": [{
            "task":{
                type: String,
                required: true,
            }
        }]
    }
)

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
