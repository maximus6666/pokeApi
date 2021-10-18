import { Box, Heading, Image } from 'grommet';
import React from 'react';
import { formatString } from '../helpers';

export const PokemonDetails = (props) => {
  const {name, types, sprites: other, stats, weight, moves, id} = props;
  const pokemonImg = other?.other.dream_world.front_default;

  const getPokemonStats = (stats) => {
    return stats.reduce((accum, el) => {
    return {
      ...accum,
      [el.stat.name]:el.base_stat,
    };
   },{});
  };

  const pokemonStats = getPokemonStats(stats);
  const title = formatString(name);

  return (
    <Box className='details-container-wrapper'>
      <Box className='details-container'>
      <Box 
      className='pokemon-details'
      margin='5px 2px'
      border='all'
      background='light-1'
      justify='between'
      >
      <Box 
        className='details-img-container'
        alignSelf='center'  
      >
        <Image height='150px' width='100%' src={pokemonImg}/>
      </Box>
        <Box>
          <Heading level='3' textAlign='center'>{title} #{id}</Heading>
          <Box border='all' className='details-table-container'>
            <Box  direction='row'>
              <Box className='border-bottom' justify='center' width='70%' >Type</Box>
              <Box width='30%' className='border-left border-bottom'>
                {
                  types?.map((item) => 
                    <span 
                      className='details-type'
                      key={item.type.name}
                    >
                      {formatString(item.type.name)}
                    </span>)
                }
              </Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >Attack</Box>
              <Box width='30%' border='left'>{pokemonStats.attack}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >Defense</Box>
              <Box width='30%' border='left'>{pokemonStats.defense}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >HP</Box>
              <Box width='30%' border='left'>{pokemonStats.hp}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >SP</Box>
              <Box width='30%' border='left'>{pokemonStats['special-attack']}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >SD</Box>
              <Box width='30%' border='left'>{pokemonStats['special-defense']}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >Speed</Box>
              <Box width='30%' border='left'>{pokemonStats['speed']}</Box>
            </Box>
            <Box border='bottom' direction='row'>
              <Box width='70%' >Weight</Box>
              <Box width='30%' border='left'>{weight}</Box>
            </Box>
            <Box direction='row'>
              <Box width='70%' >Total moves</Box>
              <Box width='30%' border='left'>{moves.length}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>   
    </Box>
    
  )
}
