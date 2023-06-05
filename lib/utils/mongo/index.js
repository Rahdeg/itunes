import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI,{dbName: process.env.DB_NAME}, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export { connect };



// import {MongoClient} from 'mongodb'
// const URI = process.env.MONGODB_URI
// const options = {dbName: process.env.DB_NAME }

// if(!URI) throw new Error('Please add your mongodb uri');

// let client = new MongoClient(URI,options)
// let clientPromise

// if(process.env.NODE_ENV === 'production'){
//     if(!global._mongoClientPromise ){
//         global._mongoClientPromise = client.connect()
//     }

//     clientPromise = global._mongoClientPromise
// } else {
//     clientPromise = client.connect()
// }

// export default clientPromise
