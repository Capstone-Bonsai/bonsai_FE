import React from 'react'

function MinHeight({children}) {
  return (
    <div className='min-h-[70vh]'>
        {children}
    </div>
  )
}

export default MinHeight