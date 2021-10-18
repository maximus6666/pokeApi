import { Box, Heading, Image } from 'grommet';
import { formatString } from '../helpers/formatString';
import React from 'react';

export const PokemonCard = (props) => {
  const {name, types, sprites, onClick: setSelectedPokemon } = props;
  const pokemonImg = sprites.other.dream_world.front_default;
  const title = formatString(name);
  return (
    <Box 
      onClick={() => {
        setSelectedPokemon(props)
      }}
      className='pokemon-card'
      width='250px'
      margin='5px 2px'
      border='all'
      background='light-1'
      justify='between'
    >
      <Box 
        className='card-img-container'
        alignSelf='center'  
      >
        <Image height='100%' width='100%'  src={pokemonImg}/>
      </Box>
      <Box>
        <Heading level='3' textAlign='center'>{title}</Heading>
        <Box direction='row'>
          {types.map((item) => 
            <Box 
              key={item.type.name}
              className={`card-type-box ${item.type.name}`}
            >
              {formatString(item.type.name)}
            </Box>)}
        </Box>
      </Box>
    </Box>
  )
}
