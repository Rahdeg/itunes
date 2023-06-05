const mongoose = require("mongoose")

const albumsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrl:{type:String, required:true},
},{
    timestamps:true
})

const ALbums = mongoose.models.albums || mongoose.model('albums', albumsSchema);

export default ALbums;
