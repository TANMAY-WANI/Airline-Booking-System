import React from 'react'

const Layout = ({style, children}) => {
  return (
    <div className='mt-14 py-4  bg-cover bg-center bg-no-repeat h-[93vh] w-full'  style={style ? { ...style } : {}}>
        {children}
    </div>
  )
}

export default Layout