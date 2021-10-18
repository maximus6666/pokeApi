import { Box, Paragraph, Select } from 'grommet';
import React from 'react';

export const FilterSelect = ({onSelect, optionsList, value}) => {

  return (
    <Box direction='row' wrap={true} justify='center' alignSelf='center'>
      <Paragraph >Filter by type</Paragraph>
      <Select
        margin={{left:'10px'}}
        options={[...optionsList]}
        value={value}
        onChange={({ option }) => {
          onSelect(option)
        }}
      />
     
    </Box>
  )
}
