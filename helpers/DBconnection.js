const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


// function mongoDB() {
//   return (
//     mongoose
//       .connect('mongodb://127.0.0.1:27017/resturent')

//       .then(() => console.log('Connected DATABASE!'))
//       .catch(() => console.log(' connection failed'))
//   );
// }
function mongoDB(){
    return mongoose
    .connect('mongodb://127.0.0.1:27017/restaurent')
  
    .then(() => console.log('Connected DATABASE!'))
    .catch(() => console.log(' connection failed'));
  

}


module.exports = { mongoDB }
