import React from 'react'

const Mainlayout = ({children}) => {
  return (
    <div className='min-h-screen overflow-auto bg-white'>
        {children}
    </div>
  )
}

export default Mainlayout