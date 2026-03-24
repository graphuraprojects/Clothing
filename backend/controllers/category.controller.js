import Category from "../models/category.model.js";
import slugify from "slugify";

/* ================= CREATE CATEGORY ================= */


export const createCategory = async (req, res) => {
  try {
    const { name, collection, gender } = req.body;

    console.log("CREATE CATEGORY BODY:", req.body);

    if (!name || !collection) {
      return res.status(400).json({ message: "Name & collection required" });
    }

    const normalizedName = name.trim();

    const exists = await Category.findOne({
      name: new RegExp(`^${normalizedName}$`, "i"),
      collection,
      gender: gender || null,
      isActive: true
    });

    console.log("CATEGORY EXISTS:", exists);

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: normalizedName,
      slug: slugify(normalizedName, { lower: true, strict: true }),
      collection,
      gender: gender || null,
      isActive: true
    });

    console.log("CATEGORY CREATED:", category);

    res.status(201).json(category);
  } catch (err) {
    console.log("CREATE CATEGORY ERROR:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }

    res.status(500).json({ message: err.message });
  }
};

/* ================= GET CATEGORIES (FILTERABLE) ================= */
export const getAllCategories = async (req, res) => {
  try {
    const { collection, gender } = req.query;

    let filter = {
      isActive: true,
      collection: { $exists: true, $ne: null }
    };

    if (collection) filter.collection = collection;
    if (gender) filter.gender = gender;

    console.log("REQ QUERY:", req.query);
    console.log("CATEGORY FILTER:", filter);

    const categories = await Category.find(filter).sort({ createdAt: -1 });

    console.log("CATEGORIES FROM DB:", categories);

    res.json(categories);
  } catch (err) {
    console.log("GET CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
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
