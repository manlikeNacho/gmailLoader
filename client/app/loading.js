import { Spinner } from '@nextui-org/spinner'
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Spinner color='default' size='lg'/>
    </div>
  )
}

export default Loading