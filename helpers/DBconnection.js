const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

function mongoDB(){
    return mongoose
    .connect('mongodb://127.0.0.1:27017/restaurent')
    // .connect('mongodb+srv://xasancumar:1zhHPp6abdOhvt1k@cluster0.d4o1wlf.mongodb.net/restaurent')
    .then(() => console.log('Connected DATABASE!'))
    .catch(() => console.log(' connection failed'));
  
}

module.exports={mongoDB}