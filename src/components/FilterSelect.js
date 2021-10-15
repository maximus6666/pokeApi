import { Box, Paragraph, Select } from 'grommet';
import React, { useEffect } from 'react';
import { useState } from 'react';

export const FilterSelect = ({handleSelect, pokemonList}) => {
  const [value, setValue] = useState('All');
  const [options, setOptions] = useState(['All']);

  const createSelectOptions = (arr) => {
    const result = [];
    arr.forEach((el) => {
      el.types.forEach((el) => {
        result.push(el.type.name);
      });
    });
  
    return [...new Set(result)];
  };

  useEffect(() => {
    if (pokemonList.length){
      const list = createSelectOptions(pokemonList);
      setOptions(['All', ...list]);
    }
    
  },[pokemonList]);
  return (
    <Box direction='row' wrap={true} justify='center' alignSelf='center'>
      <Paragraph >Filter by type</Paragraph>
      <Select
        margin={{left:'10px'}}
        options={[...options]}
        value={value}
        onChange={({ option }) => {
          setValue(option)
          handleSelect(option)
        }}
      />
     
    </Box>
  )
}
