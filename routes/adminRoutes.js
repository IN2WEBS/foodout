const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

router.post('/api/admin/additem', async (req, res) => {
  console.log(req.body);

  // naujas irasas i DB
  const item = new Item({
    name: req.body.name,
    price: req.body.price
  });
  await item.save();
  res.send({message:'new item saved'})

});


module.exports = router;