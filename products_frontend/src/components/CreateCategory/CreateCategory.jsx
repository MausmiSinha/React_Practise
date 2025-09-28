import React, { useState } from 'react'
import categoryService from '../../Service/CategoryService';
import { postCategory, updateCategory } from '../../Reducers/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function CreateCategory() {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const category = useSelector(state => {
    const initialData = state.categories.categories
    const filteredData = expensiveFiltering(initialData)
    return filteredData
  });

  function expensiveFiltering(initialData){
    console.log("inside filter")
    console.log(initialData.filter(c => c.id === id)[0])
    return initialData.filter(c => c.id === id)[0];
  }

  const [newCategory, setnewCategory] = useState(
    {
      "name":category?.name,
      "description": category?.description
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log("newCategory");
    console.log(newCategory);
    if(category == null){
      categoryService.postCategory(newCategory)
      .then((response) => {
          console.log("Response from API::");
          console.log(response)
          if (response?.status === 200) {
            dispatch(postCategory(response?.data));
            Swal.fire({
              title: 'New Category Created Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok Thanks'
            })
            navigate("/category")
          } else {
            console.log("At Create Category Component, error in response from backend");
            Swal.fire({
              title: 'Ops! Something went wrong.',
              icon: "error",
              confirmButtonText: 'Ok'
            })
            navigate("/category")
          }
      })
    } else{
      console.log("Updating Category");
      const patchData = {
        ...newCategory,
        "id": id
      }
      categoryService.patchCategory(patchData)
          .then((response) => {
            console.log("Response from api:");
            console.log(response);
            if(response?.status === 200){
              dispatch(updateCategory(response?.data));
              Swal.fire({
                title: "Category Updated",
                icon: "success",
                confirmButtonText: "OK"
              })
              navigate("/category")
            } else {
                console.log("Didn't update the category.");
                Swal.fire({
                  title: 'Ops! Something went wrong.',
                  icon: "error",
                  confirmButtonText: 'Ok'
                })
                navigate("/category")
            }
          })
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {category !== null ? "Update Your Category" : "Create New Category"}
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory?.name}
            onChange={(e) =>
              setnewCategory({
                ...newCategory,
                name: e.target.value,
              })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Describe category"
            value={newCategory?.description}
            onChange={(e) =>
              setnewCategory({
                ...newCategory,
                description: e.target.value,
              })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg font-medium text-white shadow-md transition 
            ${category != null
                  ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                } focus:outline-none focus:ring-2`}
            style={{cursor: "pointer"}}
            >
          {category != null ? "Update" : "Submit"}
        </button>


      </form>
    </div>
  )
}

export default CreateCategory;