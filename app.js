const express = require('express');
const mongoose = require('mongoose');
const Item = require('./model/user')
const app = express();


mongoose.connect('mongodb://localhost:27017/pagination_practice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/items', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const itemsPerPage = 10;

  try {
    const totalItems = await Item.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const skip = (page - 1) * itemsPerPage;
    const items = await Item.find().skip(skip).limit(itemsPerPage);

    res.json({
      items,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching paginated data' });
    console.log(err)
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
