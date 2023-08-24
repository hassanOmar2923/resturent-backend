const express = require('express');
const app = express();
app.use(express.json());
const port = 3001;
app.get('/', function (req, res) {
  res.send('welcome to resturent backen');
});
app.listen(port);
console.log(port);
