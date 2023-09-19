const express = require('express');
const { StoreItemModel } = require('../models/StoreItemmodel');
const dayjs = require('dayjs');

const router = express.Router();

router.post('/', async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const current = dayjs(endDate);
  const endcurrentdata = current.add(1, 'days');
  const data = await StoreItemModel.find({
    createdAt: {
      $gte: startDate,
      $lte: endcurrentdata,
    },
  });
  let totalamount = data.reduce((total, item) => total + item.amountPaid, 0);
  // console.log(data);/

  res.send(data);
});

// router.post('/', StoreitemPost);

module.exports = router;
