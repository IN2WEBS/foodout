const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
// importuojam routinga is routes papkes
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const mongoose = require('mongoose');

// promise integravimas i mongoose
mongoose.Promise = global.Promise;

// prisijungimas
mongoose.connect('mongodb://admin:admin1234@ds033966.mlab.com:33966/mcdonalds');
mongoose.connection
    .once('open', ()=>console.log('connected to DB'))
    .on('error', (e)=>console.log(e));

const port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// publick routes naudojimas
app.use('/', publicRoutes);
app.use('/', adminRoutes);

if(process.env.NODE_ENV==='production'){
  console.log('test prod');
  console.log(__dirname+'/client/build/index.html');
  app.get('/*', (req,res)=>{
      res.sendFile(__dirname+'/client/build/index.html')
  })
}



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});