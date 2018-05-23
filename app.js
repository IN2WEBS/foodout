const express = require('express');
const app = express();

const port = process.env.PORT || 9000;

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
   res.send('🚧 project is under construction 🚧')
});
app.get('/api/welcome', (req,res)=>{
    res.json({
      message:'Welcome!',
      url:'/images/heroimage.png'
    })
});


app.listen(port,()=>{
   console.log(`server is running on port ${port}`);
});