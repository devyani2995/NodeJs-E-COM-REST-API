import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'types', //here refPath name can be anything
    },
    types: {
        type: String,
        enum: ['Product', 'Category']
    }
}).pre('save', (next) => {  //this hook middleware will be executed before save
    console.log("New like coming in");
    next();
}).post('save', (doc) => { //this hook middleware will be executed after save
    console.log("Like is saved");
    console.log(doc);
}).pre('find', (next) => {
    console.log("Retriving likes");
    next();
}).post('find', (doc) => {
    console.log("Find is completed");
    console.log(doc);
})