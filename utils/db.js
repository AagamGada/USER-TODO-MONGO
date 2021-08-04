const mongoose = require('mongoose');

async function dbConnect() {
    try {
        await mongoose.connect("mongodb+srv://aagam27:hDEE3YKd.R7_$Ja@cluster0.dwi3w.mongodb.net/todo?retryWrites=true&w=majority", {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connected")
    }
    catch(err){
        console.log("DB Failed to Connect");
        console.log(err);
        process.exit(1);
    }
}
dbConnect();



