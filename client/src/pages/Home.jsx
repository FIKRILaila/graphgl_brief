import React from 'react'
import { Categories } from '../components/Categories'
import { Products } from '../components/Products'

export function Home() {
  return (
    <div className="container d-flex justify-content-between">
        <Categories/>
        <Products/>
    </div>
  )
}
