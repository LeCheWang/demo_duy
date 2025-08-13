const categoryRouter = require('./category.router');
const productRouter = require('./product.router');

module.exports = (app) => {
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
};
