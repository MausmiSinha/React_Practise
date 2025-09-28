import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router'
import   categoryService  from '../../Service/CategoryService'
import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../Reducers/CategorySlice'
import Swal from 'sweetalert2'
import { deleteProductOfCategory } from '../../Reducers/ProductSlice'

const Category = ({ data }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleDelete(e) {
    e.preventDefault();
    console.log("Delete Button Clicked");
    categoryService.deleteCategory(data?.id)
            .then((response)=> {
              console.log("Delete response");
              console.log(response);
              if(response?.status === 200){
                dispatch(deleteProductOfCategory(data?.name));
                dispatch(deleteCategory(data));
                Swal.fire({
                            title: 'Deleted Successfully!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                          })
                          console.log("Deleted Successfully");
              } else {
                console.log("No Response")
              }
            })
  }

  function handleUpdate(e){
    e.preventDefault();
    console.log("Update Button Clicked");
    navigate(`/category/editCategory?id=${data.id}`);
  }

  return (
    <Link to={`/category/${data?.id}`} className="block">
      <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
        
        <div className="h-48 w-full overflow-hidden">
          <img
            src={data?.imageUrl || "data:image/jpeg;base64,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"} 
            alt={data?.name}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
            {data?.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Description:{" "}
            <span className="text-gray-700 font-medium">{data?.description}</span>
          </p>

          <div>
                    <button onClick={handleDelete}>
                      <FaTrashAlt style={{ margin: "5px 5px", fontSize: "1.6em", cursor: "pointer" }} />
                    </button>
                    <button onClick={handleUpdate}>
                      <FaPencil style={{ fontSize: "1.6em", margin: "5px 5px", cursor: "pointer" }} />
                    </button>
                  </div>
        </div>
      </div>
    </Link>
  )
}

export default Category
