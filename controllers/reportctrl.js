const moment = require('moment');
const { StoreItemModel } = require('../models/StoreItemmodel');

function filterData(data, startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);

  return data.filter((item) => {
    const date = moment(item.date);
    return date >= start && date <= end;
  });
}

app.post('/', async (req, res) => {
  const data = await StoreItemModel.find(req.body);
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  //   const getdata= await StoreItemModel.find(req.body)

  const filteredData = filterData(data, startDate, endDate);

  res.send(filteredData);
});
