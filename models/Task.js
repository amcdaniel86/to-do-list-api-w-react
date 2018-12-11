const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const taskSchema = new Schema({
    title: String,
    description: String

})

const Task = mongoose.model('Task', taskSchema);
// model is Task with capital letter and no S at end.modulethus, the collection will be called tasks to differentiate interface.



module.exports = Task;

// first make a model in express api app.