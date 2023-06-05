const mongoose = require("mongoose")

const artistsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrl:{type:String, required:true},
    twitter:{type:String, required:true},
    instagram:{type:String, required:true},
},{
    timestamps:true
})

const Artists = mongoose.models.artists || mongoose.model('artists', artistsSchema);

export default Artists;