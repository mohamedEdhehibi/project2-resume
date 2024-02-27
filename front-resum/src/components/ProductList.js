import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

const ProductList = () => {
  const products=useSelector(state=>state.products)
  console.log(products)
  return (
    <div className='content'>
      <h1>Product List</h1>
      <div className='cardcontent'>

    {products.map(prod=>(
      <Product key={prod.id} {...prod}/>
    ))}
      </div>
    </div>
  )
}

export default ProductList