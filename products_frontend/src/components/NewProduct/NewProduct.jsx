import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productService from '../../Service/ProductService';
import { postProduct, updateProduct } from '../../Reducers/ProductSlice';
import { useNavigate, useSearchParams } from 'react-router';
import Swal from 'sweetalert2';



const NewProduct = () => {

    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");

    const product = useSelector(state => {
            const initialData = state.products.products
            const filteredData = initialData.filter(p => p.uid === uid)[0]
            return filteredData
    });

    const [newProduct, setnewProduct] = useState(
        {
            "product_name": product != null? product.product_name : "",
            "brand": product != null? product.brand : "",
            "price": product != null? product.price : "",
            "quantity": product != null? product.quantity : "",
            "category_name": product != null? product.category_name : ""
        }
    )

    const categoriesLov = useSelector(state => state.categories.categories);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(product === null){
            console.log("Creating new Product")
            console.log(newProduct);
            productService.postProduct(newProduct)
                .then((Response) => {
                    console.log("Reponse in newProduct is::");
                    console.log(Response);
                    if (Response?.status === 200) {
                        dispatch(postProduct(Response?.data));
                        Swal.fire({
                            title: 'Product Created Successfully!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        navigate("/products")
                    }
                    else {
                        console.log("At NewProduct Component, error in response from backend");
                        Swal.fire({
                            title: 'Ops! Something went wrong.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                        navigate("/products")
                    }
                })
                .finally(() => {
                    console.log("Product Created Successfully");

                })
        } else {
            console.log("Updating existing product");
            const patchData = {
                ...newProduct,
                "uid": uid
            }
            productService.patchProduct(patchData)
                .then((response) => {
                    console.log("Response from patch request")
                    console.log(response);
                    if(response?.status === 200){
                        dispatch(updateProduct(response?.data))
                        Swal.fire({
                            title: 'Product Updated Successfully!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        navigate("/products")
                    } else {
                        Swal.fire({
                            title: 'Ops! Something went wrong.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                        navigate("/products")
                    }
                })
        }


    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg border border-gray-200"
            >
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    {product != null ? "Update Product" : "Create New Product"}
                </h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct?.product_name}
                        onChange={(e) =>
                            setnewProduct({
                                ...newProduct,
                                product_name: e.target.value,
                            })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand
                    </label>
                    <input
                        type="text"
                        placeholder="Brand"
                        value={newProduct?.brand}
                        onChange={(e) =>
                            setnewProduct({
                                ...newProduct,
                                brand: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct?.price}
                        onChange={(e) =>
                            setnewProduct({
                                ...newProduct,
                                price: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                    </label>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newProduct?.quantity}
                        required
                        onChange={(e) =>
                            setnewProduct({
                                ...newProduct,
                                quantity: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="mb-6" >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name='categoryDropdown'
                        value={newProduct?.category_name}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50"
                        onChange={(e) =>
                            setnewProduct({
                                ...newProduct,
                                category_name: e.target.value,
                            })
                        }
                    >
                        <option name="category"
                            style={{ fontFamily: "inherit" }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"> </option>
                        {
                            categoriesLov.map((value, key) => (
                                <option key={key} value={value?.name}
                                    style={{ fontFamily: "inherit" }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">{value?.name}</option>
                            ))
                        }
                    </select>

                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white shadow-md transition 
        ${product != null
                            ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                        } focus:outline-none focus:ring-2`}
                >
                    {product != null ? "Update" : "Submit"}
                </button>
            </form>
        </div>

    )
}

export default NewProduct
