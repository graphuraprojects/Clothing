import Category from "../models/category.model.js";
import slugify from "slugify";

/* ================= CREATE CATEGORY ================= */

export const createCategory = async (req, res) => {
 try {

  const { name, collection, gender } = req.body;

  if (!name || !collection) {
   return res.status(400).json({ message: "Name & collection required" });
  }

  const normalizedName = name.trim();

  const exists = await Category.findOne({
   name:new RegExp(`^${normalizedName}$`,"i"),
   collectionRef: collection,
   gender: gender || null,
   isActive:true
  });

  if (exists) {
   return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({

   name:normalizedName,
   slug:slugify(normalizedName,{lower:true,strict:true}),

   collectionRef: collection,
   gender: gender || null,

   isActive:true
  });

  res.status(201).json(category);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

/* ================= GET CATEGORIES (FILTERABLE) ================= */

export const getAllCategories = async (req, res) => {

 try{

  const { collection, gender } = req.query;

  let filter = { isActive:true };

  if(collection) filter.collectionRef = collection;
  if(gender) filter.gender = gender;

  const categories = await Category.find(filter)
   .sort({ createdAt:-1 });

  res.json(categories);

 }catch(err){
  res.status(500).json({message:err.message});
 }
};

/* ================= DELETE CATEGORY ================= */

export const deleteCategory = async (req, res) => {

 try{

  const cat = await Category.findByIdAndUpdate(
   req.params.id,
   { isActive:false },
   { new:true }
  );

  if(!cat) return res.status(404).json({message:"Category not found"});

  res.json({success:true});

 }catch(err){
  res.status(500).json({message:err.message});
 }
};
