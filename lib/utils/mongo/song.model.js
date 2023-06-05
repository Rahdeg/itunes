const mongoose = require("mongoose")

const songsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrl:{type:String, required:true},
    songUrl:{type:String, required:true},
    album:{type:String},
    artist:{type:String, required:true},
    language:{type:String, required:true},
    category:{type:String, required:true},
},{
    timestamps:true
})

const Songs = mongoose.models.songs || mongoose.model('songs', songsSchema);
export default Songs;

// exports.Songs = mongoose.model('Songs', songsSchema)