import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';

export default class CartItemsRepository {
    constructor() {
        this.collection = "cartItems";
    }


    // async add(productID, userID, quantity) {
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         const id = await this.getNextCounter(db);
    //         //find the document   
    //         //either insert or update
    //         //insertion
    //         await collection.updateOne({ productID: new ObjectId(productID), userID: new ObjectId(userID), quantity },
    //             {   
    //                 $setOnInsert: {_id:id}, //set the id only on insert operation but not on update operation
    //                 $inc:{
    //                 quantity:quantity  
    //             }},
    //             {upsert:true}) //by the help of this option updateOne is updating and inserting data
    //     } catch (err) {
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    async add(productID, userID, quantity){
        try{
            const db = getDB();
            const collection = db.collection(this.collection)
            const id = await this.getNextCounter(db);
            // find the document
            // either insert or update
            // Insertion.
            await collection.updateOne(
                {productID:new ObjectId(productID), userID:new ObjectId(userID)},
                {
                    $setOnInsert: {_id:id},//set the id only on insert operation but not on update operation
                    $inc:{
                    quantity: quantity
                }},
                {upsert: true}) //by the help of this option updateOne is updating and inserting data

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }



    async get(userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({ userID: new ObjectId(userID) }).toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(userID, cartItemID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({ _id: new ObjectId(cartItemID), userID: new ObjectId(userID) });
            return result.deletedCount > 0;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    //update the counter and return it back to the add function
    async getNextCounter(db){

        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value: 1}},
            {returnDocument:'after'}
        )  
        console.log(resultDocument.value);
        return resultDocument.value;
    }
}