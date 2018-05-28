const express = require('express');
const app = express();
const categories = require('./data/categories');
const menu = require('./data/menu');

const port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/public'));

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
    res.json({menu})
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});