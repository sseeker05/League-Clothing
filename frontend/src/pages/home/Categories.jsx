import React from 'react'
import { Link } from 'react-router-dom'
import category1 from "../../assets/category-1.jpg"
import category2 from "../../assets/category-2.jpg"
import category3 from "../../assets/category-3.jpg"
import category4 from "../../assets/category-4.jpg"



const Categories = () => {
  const categories = 
  [
    {
      name:"Accessories", path:"accessories",image: category1
    },
     {
      name:"Dress", path:"dress",image: category2
     },
     {
      name:"Jewellery", path:"jewellery",image: category3
     },
     {
      name:"Comestics", path:"cometsics",image: category4
     }
  ]
  return (
    <>
    <div className='product__grid'>
    {
       categories.map ((category) => (
        <Link to={`/category/${category.path}`} className='categories__card'>
         <img src={category.image} alt='' /> 
         <h4>{category.name}</h4>
        </Link>
         ))
           
    }
    </div>
    </>
  )
}

export default Categories



