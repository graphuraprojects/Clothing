import { X, TicketPercent, Sparkles } from "lucide-react";
import { useState } from "react";

import API from "../../api/axios";

export default function CreateCouponModal({ open, onClose, refresh }) {

  if (!open) return null;

  const [discountType, setDiscountType] = useState("percentage");
  const [couponCode, setCouponCode] = useState("LUXE2024");
  const [discountValue, setDiscountValue] = useState(15);
  const [minSpend, setMinSpend] = useState(true);


  const handlePublish = async () => {
    try {
      await API.post("/coupons", {
        code: couponCode.toUpperCase(),
        type: discountType === "percentage" ? "Percentage" : "Fixed Amount",
        discountValue: Number(discountValue),
        minSpend: minSpend ? 1000 : 0,
        status: "Active",
        validity: "Permanent",
        usage: "0 / 1000",
      });

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center px-4 sm:px-6 py-4 border-b gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              Create New Coupon
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Configure exclusive offers and redemption rules
            </p>
          </div>

          <button onClick={onClose} className="shrink-0 cursor-pointer">
            <X />
          </button>
        </div>


        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* LEFT FORM */}
            <div className="lg:col-span-2 p-4 sm:p-6 space-y-5">

              <div>
                <label className="text-sm font-medium">Coupon Code</label>
                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                  <button
                    onClick={() =>
                      setCouponCode("SALE" + Math.floor(Math.random() * 999))
                    }
                    className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm cursor-pointer"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Internal Description
                </label>
                <input
                  placeholder="Private note for your team"
                  className="w-full px-4 py-2 border rounded-xl mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Discount Value
                </label>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setDiscountType("percentage")}
                    className={`cursor-pointer ${`px-4 py-2 rounded-xl border text-sm ${
                      discountType === "percentage"
                        ? "bg-black text-white"
                        : ""
                    }`}`}
                  >
                    Percentage
                  </button>

                  <button
                    onClick={() => setDiscountType("fixed")}
                    className={`cursor-pointer ${`px-4 py-2 rounded-xl border text-sm ${
                      discountType === "fixed"
                        ? "bg-black text-white"
                        : ""
                    }`}`}
                  >
                    Fixed Amount
                  </button>
                </div>

                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="mt-3 w-full px-4 py-2 border rounded-xl"
                  placeholder={
                    discountType === "percentage"
                      ? "% Discount"
                      : "₹ Discount"
                  }
                />
              </div>

              <div className="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <p className="font-medium">
                    Minimum Spend Requirement
                  </p>
                  <p className="text-sm text-gray-500">
                    Apply only on orders above a value
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={minSpend}
                  onChange={() => setMinSpend(!minSpend)}
                  className="scale-125"
                />
              </div>

              {minSpend && (
                <input
                  type="number"
                  defaultValue={500}
                  className="w-full px-4 py-2 border rounded-xl"
                />
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-black text-white rounded-xl cursor-pointer"
                >
                  Publish Coupon

                </button>
              </div>
            </div>


            {/* RIGHT PREVIEW */}
            <div className="bg-gray-50 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l space-y-4">
              <p className="text-xs text-gray-500">LIVE PREVIEW</p>

              <div className="border rounded-xl p-4 bg-white space-y-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <TicketPercent />
                  <span className="font-semibold">{couponCode}</span>
                </div>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • {discountValue}
                    {discountType === "percentage" ? "%" : "₹"} OFF applied
                  </li>
                  {minSpend && <li>• Minimum spend ₹500 required</li>}
                  <li>• Limited to 1 use per customer</li>
                </ul>
              </div>

              <div className="border rounded-xl p-4 bg-white">
                <p className="text-sm text-gray-500">Quick Stats</p>
                <p className="mt-2 font-semibold flex items-center gap-2">
                  <Sparkles size={16} /> Estimated Reach: 12,400
                </p>
              </div>
            </div>


           
              <p className="text-sm text-gray-500">Projected Cost: ₹1.2L</p>
            </div>

          </div>
        </div>
      </div>
    
  );
}
