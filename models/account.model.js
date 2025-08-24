const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const typeRole = require('../constants/type.role');

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080',
    },
    role: {
      type: String,
      enum: Object.values(typeRole),
      default: typeRole.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

accountSchema.pre('save', function (next) {
  const account = this;

  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }

  next();
});

accountSchema.pre('findOneAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }
  this.setUpdate(account);

  next();
});

accountSchema.pre('findByIdAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }
  this.setUpdate(account);

  next();
});

module.exports = mongoose.model('account', accountSchema);
