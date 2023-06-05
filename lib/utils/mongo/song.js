import clientPromise from ".";

let client 
let db
let songs 

async function init(){
    if(db)return
    try {
        client = await clientPromise
        db = await client.db();
        songs = await db.collection('songs')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
};

(async ()=>{
    await init()
})()

export async function getSongs(){
    try {
        if(!songs) await init()
        const result = await songs.find({}).toArray()
        return {songs:result}
    } catch (error) {
        return {error:"Failed to fetch songs"}
    }
}


// limit(20).map(user=>({...user,_id: user._id.toString()})).