import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import NewProduct from "../NewProduct/NewProduct";

const FloatingPlusButton = () => {
  return (
    <Link
      to="/newProduct"
      className="bottom-6 right-6 bg-orange-600 hover:bg-green-700 text-white rounded-full shadow-lg w-20 h-20 flex items-center justify-center transition-colors"
    >
      <Plus className="w-10 h-10" />

    </Link>
  );
};

export default FloatingPlusButton;