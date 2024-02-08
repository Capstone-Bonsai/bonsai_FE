import React from 'react'

function MinHeight({children}) {
  return (
    <div className='min-h-[400px]'>
        {children}
    </div>
  )
}

export default MinHeight