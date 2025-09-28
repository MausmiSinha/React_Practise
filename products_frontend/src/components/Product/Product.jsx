import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaTrashAlt } from 'react-icons/fa';
import productService from '../../Service/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../Reducers/ProductSlice';
import { FaPencil } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Product = ({ data }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleDelete(e) {
    //e: event (It prevent page to refresh whenever button is clicked)
    e.preventDefault();
    console.log("Delete Button Clicked");
    productService.deleteProduct(data?.uid)
      .then((Response) => {
        console.log("Delete response");
        console.log(Response)
        if (Response.status === 200) {
          dispatch(deleteProduct(data?.uid))
          Swal.fire({
            title: 'Deleted Successfully!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          console.log("Deleted")
        }
        else {
          console.log("At Product Component, got no response");
        }
      })
  }

  function handleUpdate(e) {
    e.preventDefault();
    console.log("Update Button Clicked");
    navigate("/product/editProduct?uid=" + data.uid);
  }

  return (
    <Link to={`/product/${data?.uid}`} className="block">
      <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 border border-gray-100">

        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
          {data?.product_name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Brand: <span className="text-gray-700 font-medium">{data?.brand}</span>
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Price: <span className="text-green-600 font-semibold">{data?.price}</span>
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
    </Link>
  )
}

export default Product
