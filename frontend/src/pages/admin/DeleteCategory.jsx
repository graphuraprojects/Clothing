import { useEffect,useState } from "react";
import API from "../../api/axios";

export default function DeleteCategory(){

 const [collections,setCollections]=useState([]);
 const [categories,setCategories]=useState([]);
 const [collection,setCollection]=useState("");
 const [gender,setGender]=useState("");
 const [selectedCollectionName,setSelectedCollectionName]=useState("");

 useEffect(()=>{
  API.get("/collections").then(r=>setCollections(r.data));
 },[]);

 const loadCategories=async(col,gen)=>{
  const res = await API.get(`/categories?collection=${col}&gender=${gen||""}`);
  setCategories(res.data || []);
 };

const handleCollection = (e) => {

 const value = e.target.value;
 const selected = collections.find(c => c._id === value);

 setCollection(value);
 setSelectedCollectionName(selected?.name?.toLowerCase());
 setGender("");

 if(selected?.name?.toLowerCase() !== "kids"){
  loadCategories(value,null);
 }else{
  setCategories([]);
 }

};


 const handleGender=(g)=>{
  setGender(g);
  loadCategories(collection,g);
 };

 const deleteCategory=async(id)=>{
  if(!confirm("Delete category?")) return;

  await API.delete(`/categories/${id}`,{
   headers:{
    Authorization:`Bearer ${localStorage.getItem("admin_token")}`
   }
  });

  loadCategories(collection,gender);
 };

return (

  <div className="max-w-xl mx-auto bg-white border border-gray-200 p-6 rounded-2xl
  shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">

    <h2 className="text-2xl font-bold mb-6 text-center">Delete Category</h2>

    <select
      className="border border-gray-300 bg-white p-3 rounded-xl w-full mb-4
      transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black"
      onChange={handleCollection}
    >
      <option value="">Select Collection</option>
      {collections.map(c => (
        <option key={c._id} value={c._id}>{c.name}</option>
      ))}
    </select>

    {selectedCollectionName === "kids" && (

      <select
        className="border border-gray-300 bg-white p-3 rounded-xl w-full mb-4
        transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black"
        onChange={e => handleGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="boys">Boys</option>
        <option value="girls">Girls</option>
      </select>

    )}

    <div className="space-y-2">

      {categories.map(cat => (

        <div
          key={cat._id}
          className="flex justify-between items-center border border-gray-200
          p-3 rounded-xl hover:bg-gray-50 transition"
        >

          <span>{cat.name}</span>

          <button
            onClick={() => deleteCategory(cat._id)}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  </div>

);

}
