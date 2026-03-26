import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 },

 items:[
  {
   product:{ type:mongoose.Schema.Types.ObjectId, ref:"Product" },
   name:String,
   price:Number,
   image:String,
   size:String,
   color:String,
   quantity:Number,
  }
 ],

 shipping:{
  fullName:String,
  email:String,
  address:String,
  city:String,
  state:String,
  zip:String,
  phone:String
 },

 paymentMethod:String,

 paymentStatus: {
   type: String,
   default: "pending",
   enum: ["pending", "paid", "failed", "refunded"]
 },

 subtotal:Number,
 shippingCost:Number,
 gst:Number,
 discount:Number,
 total:Number,

 status:{
  type:String,
  default:"Processing"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

});

export default mongoose.model("Order",orderSchema);
