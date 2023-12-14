import React from 'react'
import { Flex,Spin } from 'antd'

function loading() {
  return (
    <div className='flex justify-center, items-center, bg-transparent z-50'>
    <Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>
    </div>
  )
}

export default loading