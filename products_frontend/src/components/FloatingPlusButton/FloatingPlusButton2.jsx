import React from 'react'
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const FloatingPlusButton2 = () => {
  return (
  <Link
      to="/category/newCategory"
      className="bottom-6 right-6 bg-orange-600 hover:bg-green-700 text-white rounded-full shadow-lg w-20 h-20 flex items-center justify-center transition-colors"
    >
      <Plus className="w-10 h-10" />

    </Link>
  )
}

export default FloatingPlusButton2
