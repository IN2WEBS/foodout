const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

router.post('/api/admin/additem', upload.single('itemimage'), async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    // naujas irasas i DB

    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      img: '/uploads/' + req.file.originalname
    });
    await item.save();
    res.send({
      message: 'new item saved',
      name: item.name,
      price: item.price,
      category: item.category,
      img: item.img,
      _id:item._id
    });

  } catch (err) {
    console.log(err.message);
    res.status(400).send({message: 'ups, something went wrong'})
  }

});

router.get('/api/admin/items', async (req, res) => {
  const items = await Item.find({});
  res.send({items: items})
});



router.post('/api/admin/update/item', async (req, res) => {
  const item = await Item.findOne({name: req.body.name});
  item.price = req.body.price;
  await item.save();
  console.log(item);
  res.send('ok')
});

router.post('/api/remove', async (req, res) => {
  try{
    console.log(req.body);
    const item = await Item.findOne({_id: req.body._id});
    await item.remove();
    console.log(item);
    fs.unlink(`public${item.img}`, (err)=>{
        if(err) return console.log(err);
        console.log('file removed');
    });
    res.send({_id:item._id})
  }catch (err){
    console.log(err);
    res.send('wtf?')
  }
});

router.get('/test', (req,res)=>{
  fs.unlink('public/uploads/cheese-burger.png', (err)=>{
    if(err) return console.log(err);
    console.log('file removed');
  });
  res.send('ok')
});


module.exports = router;