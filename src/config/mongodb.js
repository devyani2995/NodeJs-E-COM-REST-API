//1.import mongodb client
import { MongoClient } from "mongodb";

//2.define url(address of database) and name of DB
// const url ="mongodb://localhost:27017/ecomdb";

let client;
//3.connect to mongodb
export const connectToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance;
            console.log("Mongodb is connected");
            createCounter(client.db());
            createIndexes(client.db());
        })
        .catch(err => {
            console.log(err);
        })
}

export const getClient = ()=>{
    return client;
}

//to get only ecomdb but not entire database
export const getDB = () => {
    return client.db();
}

//for modifying id of mongodb
const createCounter = async (db) => {
    const existingCounter = await db.collection("counters").findOne({ _id: 'cartItemId' });
    if (!existingCounter) {
        await db.collection("counters").insertOne({ _id: 'cartItemId', value: 0 });
    }
}


//create index
const createIndexes = async (db) => {
    try {
        await db.collection("products").createIndex({ price: 1 }); //here 1 for ascending order
        await db.collection("products").createIndex({ name: 1, category: -1 }); // here -1 for descending
        await db.collection("products").createIndex({ desc: "text" });
    } catch (err) {
        console.log(err);
    }
    console.log("Indexes are created");
}


