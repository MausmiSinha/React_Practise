import React from 'react'
import Category from '../Category/Category';
import { useSelector } from 'react-redux';
import FloatingPlusButton2 from '../FloatingPlusButton/FloatingPlusButton2';

const Categories = () => {

  const categories = useSelector(state => state?.categories?.categories);

  return (
    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    style={{padding:"2em"}}>
            {
                categories &&
                categories.map((p, i) => (
                    <Category data={p} key={i} />
                ))
            }
            <FloatingPlusButton2 />
        </div>
  )
}

export default Categories
