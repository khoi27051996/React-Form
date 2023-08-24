import React from 'react'
import FormList from './FormList'
import FormTable from './FormTable'

const Form = () => {
  return (
    <div>
      <h1 className='text-center bg-dark text-warning py-3'>Thông tin sinh viên</h1>
      <div className="container">
        <FormList/>
        <FormTable/>
      </div>
    </div>
  )
}

export default Form
