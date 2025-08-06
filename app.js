const express = require('express');
const app = express();
const connectDB = require('./configs/database');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

app.use(express.static('./public'));

connectDB();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('./controllers/category.controller');

app.post('/api/categories', createCategory);
app.get('/api/categories', getCategories);
app.patch('/api/categories/:id', updateCategory);
app.delete('/api/categories/:id', deleteCategory);

app.get('/', (req, res) => {
  //truy vấn dữ liệu từ cơ sở dữ liệu
  //render ra giao diện

  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200 },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 300 },
  ];

  res.render('home/home.ejs', { products });
});

app.get('/about', (req, res) => {
  res.render('about/about.ejs');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
