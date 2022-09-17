import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Products from './components/Products'
import {CartProvider} from 'react-use-cart'
import ThankU from './components/ThankU'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Products/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/thankU' element={<ThankU/>}/>
        </Routes>
      </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
