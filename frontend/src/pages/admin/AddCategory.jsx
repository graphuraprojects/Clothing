import { useState,useEffect } from "react";

const AddCategory = ({ refresh }) => {

 const [name,setName]=useState("");
 const [collection,setCollection]=useState("");
 const [gender,setGender]=useState("");
 const [collections,setCollections]=useState([]);
 const [message,setMessage]=useState("");
 const [selectedCollectionName,setSelectedCollectionName]=useState("");

 useEffect(()=>{
  fetch("/api/collections")
   .then(r=>r.json())
   .then(setCollections);
 },[]);

 const submitHandler = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/categories",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${localStorage.getItem("admin_token")}`
   },
   body:JSON.stringify({
    name,
    collection,
    gender:selectedCollectionName==="kids"?gender:null
   })
  });

  const data = await res.json();

  if(res.ok){
   setMessage("Category added");
   setName("");
   setCollection("");
   setGender("");
   refresh();
  }else{
   setMessage(data.message);
  }
 };

 return (
  <div className="bg-gray-100 flex justify-center pt-16">

    {/* CARD */}

    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full
      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <h1 className="text-3xl font-bold mb-6 text-center">Add Category</h1>

      {message && <p className="mb-4 text-sm text-center">{message}</p>}

      <form onSubmit={submitHandler} className="space-y-4">

        {/* COLLECTION */}

        <select
          value={collection}
          onChange={e => {
            const selected = collections.find(c => c._id === e.target.value);
            setCollection(e.target.value);
            setSelectedCollectionName(selected?.name?.toLowerCase());
            setGender("");
          }}
          className="w-full border border-gray-300 bg-white p-3 rounded-xl
          transition focus:outline-none focus:ring-2 focus:ring-black
          hover:border-black"
          required
        >
          <option value="">Select Collection</option>

          {collections.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* KIDS GENDER */}

        {selectedCollectionName === "kids" && (

          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full border border-gray-300 bg-white p-3 rounded-xl
            transition focus:outline-none focus:ring-2 focus:ring-black
            hover:border-black"
            required
          >
            <option value="">Select Gender</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>

        )}

        {/* CATEGORY NAME */}

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          className="w-full border border-gray-300 bg-white p-3 rounded-xl
          transition focus:outline-none focus:ring-2 focus:ring-black
          hover:border-black"
          required
        />

        {/* BUTTON */}

        <button
          className="bg-black text-white px-5 py-3 rounded-xl w-full
          transition transform hover:-translate-y-0.5 hover:bg-gray-900 cursor-pointer"
        >
          Add Category
        </button>

      </form>

    </div>

  </div>
);

};

export default AddCategory;
