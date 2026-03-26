import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

 id:Number,
 name:String,
 slug:String,
 isDeleted:{type:Boolean,default:false},
 gender:{
  type:String,
  enum:["boys","girls","Boys","Girls"],
  default:null
 },

 category:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Category"
 },

 description:String,

 price:Number,
 discountPercent:Number,
 discountPrice:Number,

//  stock:Number,
 sku:String,

 isActive:{type:Boolean,default:true},
 totalSold:{type:Number,default:0},

 sizes:[String],

 collections: [
 {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Collection"
 }
],
inventory: [
  {
    size: String,
    color: String,
    stock: { type: Number, default: 0 }
  }
],


 isTrending:{type:Boolean,default:false},
 isBrandStory:{type:Boolean,default:false},
 isCarousel: { type: Boolean, default: false },
carouselTitle: String,
carouselSubtitle: String,
carouselPriceText: String,

  isPremium:{type:Boolean,default:false},
 isLimited:{type:Boolean,default:false},

 details:{
  fabric:String,
  material:String,
  care:String,
  weight:String,
  dimensions:String,
  origin:String
 },

 // ⭐ Color + Images
 colors:[
 {
  name:String,
  hex:String,
  images:[String]
 }
]
,

 // Fallback images array
 images:[String],


 location:{
  city:String,
  state:String,
  pincode:String
 }

},{timestamps:true});

export default mongoose.model("Product", productSchema);
