import React from 'react'
import './Admin.css'
import Siderbar from '../../Sidebar/Siderbar'
import {Routes, Route} from 'react-router-dom'
import AddProducts from '../../AddProducts/AddProducts'
import Listproduct from '../../ListProduct/Listproduct'

const Admin = () => {
  return (
    <div className='admin'>
        <Siderbar />
            <Routes>
            <Route path='/addproduct' element={<AddProducts />}/>
            <Route path='/listProduct' element={<Listproduct />}/>
        </Routes>

    </div>
  )
}

export default Admin