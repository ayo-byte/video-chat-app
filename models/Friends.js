const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const friendsSchema = new Schema({
    name: String,
    lastName: String

});

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;