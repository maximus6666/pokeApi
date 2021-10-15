import { Box, Image } from 'grommet'
import React from 'react'
import spiner from '../img/spinner-1.gif'

export const Loader = () => {
  return (
    <Box alignSelf='center'>
      <Image src={spiner}/>
    </Box>
  )
}
