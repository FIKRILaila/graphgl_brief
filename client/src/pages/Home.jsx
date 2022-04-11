import React from 'react'
import { Categories } from '../components/Categories'
import { Products } from '../components/Products'

export function Home() {
  return (
    <div className="container col-md-12">
        <Categories/>
        <Products/>
    </div>
  )
}
