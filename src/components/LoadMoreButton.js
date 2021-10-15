import { Button } from 'grommet';
import React from 'react';

export const LoadMoreButton = ({handleLoadMore}) => {
  return (
    <Button 
      onClick={handleLoadMore} 
      alignSelf='center' 
      primary 
      size='medium'
      margin='20px 0'
      label='Load more'>

    </Button>
  )
}
