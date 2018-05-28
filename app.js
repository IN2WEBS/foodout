const express = require('express');
const app = express();
const categories = require('./data/categories');
const menu = require('./data/menu');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('🚧 project is under construction 🚧')
});
app.get('/api/welcome', (req, res) => {
  res.json({
    message: 'Welcome!',
    url: '/images/heroimage.png'
  })
});
app.get('/api/categories', (req, res) => {
   res.json({categories})
});
app.get('/api/menu', (req,res)=>{
    console.log('fetching menu');
    res.json({menu})
});
app.post('/api/orders', (req,res)=>{
   console.log(req.body);
   const order = `User:${req.body.name}, address: ${req.body.address} \n`;
   fs.appendFile('order.txt', order, (err)=>{
       if(err) console.log(err);
   });
   res.send('ok')
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});