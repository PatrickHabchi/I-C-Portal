import React from 'react'
import Skeleton from 'react-loading-skeleton';

function TableSkeleton(){
  return (
    <div>
        <Skeleton count={5} className='table-skeleton'/>
    </div>
  )
}

export default TableSkeleton;