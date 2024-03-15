require('dotenv').config();
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);

const connectToMongo =  () => {
     mongoose.connect('mongodb://roott:examplee@mongo:27017/my_db').then(()=>{
        console.log("Connected to mongodb database sucessfully!")
     });
};


// TO Connect to Cloud MongoDB (MongoDB Atlas)
// const connectToMongo =  () => {
//    mongoose.connect('mongodb+srv://divya:divya$123@atlascluster.bz0nv.mongodb.net/blogs?retryWrites=true&w=majority').then(()=>{
//       console.log("Connected to mongodb database sucessfully!")
//    });
// };

module.exports = connectToMongo;