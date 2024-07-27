import React, { ReactNode } from 'react'
import Header from '@/components/Header'

const HomeLayout = ({children} : {children : ReactNode}) => {
  return (
    <div className='h-screen'>
        <Header />
        {children}
    </div>
  )
}

export default HomeLayout
