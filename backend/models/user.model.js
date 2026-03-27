import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  name: String,
  price: Number,
  image: String,

  size: String,
  color: String,
  
  location: {
  type: String,
  default: ""
},

  quantity: {
    type: Number,
    default: 1
  }
});

const wishlistSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  name: String,
  price: Number,
  image: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  location: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  isTwoFactorEnabled: {
    type: Boolean,
    default: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  // Cart now stores full product data for offline access
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      image: String,
      quantity: Number,
      size: String,
      color: String,
    }
  ],
  wishlist: [wishlistSchema],

  addresses: [],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
