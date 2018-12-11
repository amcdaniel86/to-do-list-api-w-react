const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: String,
    password: String

})

const User = mongoose.model('User', userSchema);
// model is Task with capital letter and no S at end.modulethus, the collection will be called tasks to differentiate interface.



module.exports = User;

// first make a model in express api app.