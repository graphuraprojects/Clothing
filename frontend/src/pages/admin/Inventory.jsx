import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import API from "../../api/axios";
import { exportToCSV } from "../../utils/exportCSV";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("all");

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    loadInventory();
    loadHistory();
  }, []);

  const loadInventory = async () => {
    const { data } = await API.get("/admin/dashboard/inventory", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(data);
  };

  const loadHistory = async () => {
    const { data } = await API.get("/admin/dashboard/inventory/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistory(data);
  };

  const updateStock = async (productId, size, color) => {
    const qty = prompt(`Adjust stock for ${color} / ${size}`);
    if (!qty) return;

    await API.post(
      "/admin/dashboard/inventory/update",
      { productId, size, color, quantity: Number(qty) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadInventory();
    loadHistory();
  };

  const undoLast = async (productId, size, color) => {
  if (!window.confirm("Undo last change for this variant?")) return;

  await API.post(
    "/admin/dashboard/inventory/undo",
    { productId, size, color },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  loadInventory();
  loadHistory();
};

  const getStock = (p, size, color) =>
    p.inventory.find(i => i.size === size && i.color === color)?.stock || 0;

  const stockBadge = (stock) => {
  if (stock === 0)
    return (
      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-600">
        Out
      </span>
    );

  if (stock <= 5)
    return (
      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-orange-100 text-orange-600">
        Low
      </span>
    );

  return (
    <span className="px-3 py-1 text-base font-semibold rounded-full bg-green-100 text-green-700">
      {stock}
    </span>
  );
};


  const exportInventory = () => {
    const rows = [];
    products.forEach(p =>
      p.inventory.forEach(v =>
        rows.push({
          product: p.name,
          collection: p.collections?.[0]?.name || "",
          gender: p.gender || "",
          size: v.size,
          color: v.color,
          stock: v.stock,
        })
      )
    );
    exportToCSV(rows, "inventory.csv");
  };

  /* COLLECTION FILTER */

  const collections = ["All", ...new Set(products.map(p => p.collections?.[0]?.name).filter(Boolean))];

  const filteredProducts =
    selectedCollection.toLowerCase() === "all"
      ? products
      : products.filter(p => p.collections?.[0]?.name === selectedCollection);

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-4 md:p-8">

          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6 items-start md:items-center">

            <h1 className="text-2xl font-bold">Inventory</h1>

            <div className="flex gap-3">
              <select
                    value={selectedCollection}
                    onChange={e => setSelectedCollection(e.target.value)}
                    className="no-border rounded-xl px-4 py-2 text-sm bg-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-5 focus:ring-gray-100"
                >

                {collections.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                onClick={exportInventory}
                className="flex items-center gap-2 px-5 py-2.5  no-border rounded-xl text-sm font-medium bg-black text-white  shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {filteredProducts.map(p => {
            const isKids = p.collections?.[0]?.name?.toLowerCase().includes("kids");

            return (
              <div key={p._id} className="mb-10">

                <div className="flex justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">{p.name}</h2>
                    <p className="text-sm text-gray-500">
                      {p.collections?.[0]?.name || "—"}
                      {isKids && p.gender && ` • ${p.gender}`}
                    </p>
                  </div>

                  <span className="px-3 py-3 text-xs rounded-full bg-green-100 text-green-700">
                    ACTIVE
                  </span>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b">
                        <th className="text-left py-2">Color / Size</th>
                        {p.sizes.map(s => <th key={s}>{s}</th>)}
                      </tr>
                    </thead>

                    <tbody>
                      {p.colors.map(c => (
                        <tr key={c.name} className="hover:bg-gray-50 transition">
                          <td className="py-3 font-medium">{c.name}</td>

                          {p.sizes.map(s => (
                            <td
                              key={s}
                              onClick={() => updateStock(p._id, s, c.name)}
                              className="text-center cursor-pointer hover:scale-105 transition"
                            >
                              {stockBadge(getStock(p, s, c.name))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* HISTORY */}

         <div className="bg-white rounded-2xl shadow-sm p-6 mt-12">

  <h2 className="font-semibold mb-4">Inventory History</h2>

  <table className="w-full text-sm">
    <thead>
      <tr className="text-gray-400 border-b">
        <th className="text-left py-2">Product</th>
        <th>Variant</th>
        <th>Change</th>
        <th>Done By</th>
        <th>Action</th>
        <th>Date</th>
              </tr>
    </thead>

    <tbody>
      {history.map((h,i)=>(
        <tr key={i} className="hover:bg-gray-50 transition">

          <td className="py-3 font-medium">
            {h.product?.name}
          </td>

          <td className="text-center">
            {h.color && h.size ? `${h.color} / ${h.size}` : "—"}

          </td>

          <td className={`text-center ${h.change < 0 ? "text-red-600" : "text-green-600"}`}>
            {h.change}
          </td>

          <td className="text-center text-gray-500">
            {h.updatedBy || "Admin"}
          </td>
        
        <td className="text-center">
  {h.size && h.color && (
    <button
      onClick={() => undoLast(h.product?._id, h.size, h.color)}
      className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
    >
      Restore
    </button>
  )}
</td>

          <td className="text-center text-gray-400 text-xs">
            {new Date(h.createdAt).toLocaleString()}
          </td>

        </tr>
      ))}
    </tbody>
  </table>

</div>


        </main>
      </div>
    </div>
  );
}

/* ---------- Editable Matrix Row ---------- */

function EditableMatrixRow({ row, rowIndex, onUpdate, zebra }) {
  const [editCell, setEditCell] = useState(null);
  const [value, setValue] = useState("");

  const saveValue = (colIndex) => {
    onUpdate((prev) => {
      const copy = [...prev];
      copy[rowIndex].sizes[colIndex] = value;
      return copy;
    });
    setEditCell(null);
  };

  const getColor = (item) => {
    if (item === "Out" || item === "Urgent") return "text-red-600";
    if (item === "Low") return "text-orange-600";
    return "text-green-600";
  };

  return (
    <tr className={`${zebra ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
      <td className="py-3 px-3 font-medium whitespace-nowrap">{row.color}</td>

      {row.sizes.map((item, colIndex) => {
        const isEditing =
          editCell?.row === rowIndex && editCell?.col === colIndex;

        return (
          <td
            key={colIndex}
            className={`py-3 px-3 text-center font-medium cursor-pointer ${getColor(item)}`}
            onClick={() => {
              setEditCell({ row: rowIndex, col: colIndex });
              setValue(item);
            }}
          >
            {isEditing ? (
              <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => saveValue(colIndex)}
                onKeyDown={(e) => e.key === "Enter" && saveValue(colIndex)}
                className="w-16 border rounded-md px-2 py-1 text-sm text-center"
              />
            ) : (
              <>
                {item}
                {(item === "Low" || item === "Out" || item === "Urgent") && (
                  <AlertTriangle size={14} className="inline ml-1" />
                )}
              </>
            )}
          </td>
        );
      })}
    </tr>
  );
}
