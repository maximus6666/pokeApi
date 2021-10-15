import { Box,} from 'grommet';
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PokemonDetails } from './PokemonDetails';


export const PokemonDetailsPage = ({pokemonId}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  
  async function fetchAndCathError(link) {
    try{
      setIsFetching(true);
      const res = await fetch(link);
      const data = await res.json();

      return data;
    }
    catch(err){
      console.error(err);
      alert('SWW');
    }
    finally{
      setIsFetching(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (pokemonId) {
       const data = await fetchAndCathError(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        setPokemonDetails(data);
      }
    }
    fetchData();
    
  },[pokemonId])

  const displayDetails = (pokemonDetails) => {
    return pokemonDetails && pokemonId
      ?  <PokemonDetails {...pokemonDetails}/>
      : <></>
  }
  return (
    <Box className='details-container-wrapper'>
      <Box 
      className='details-container'
    >
      {
        isFetching 
          ? <Box className='pokemon-details'>
              <Loader/>
            </Box>
          : displayDetails(pokemonDetails)
      }
    </Box>   
    </Box>
    
  )
}
