
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";  // Changed from react-icons/fi

export default function SectionAccordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-4">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex justify-between items-center font-medium text-left hover:text-blue-600 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-lg">{title}</span>
        <span className="text-gray-400">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}
