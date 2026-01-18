import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBooks from './pages/ShowBooks'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books/create' element={<CreateBooks/>} />
        <Route path='/books/details/:id' element={<ShowBooks/>} />
        <Route path='/books/edit/:id' element={<EditBook/>} />
        <Route path='/books/delete/:id' element={<DeleteBook/>} />
      </Routes>
    </div>
  )
}

export default App
