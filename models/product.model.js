const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category',
      required: true,
    }, 
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('product', productSchema);
