import { Box, Header, Heading, Main } from 'grommet';
import { useEffect, useState } from 'react';
import './App.css';
import { FilterSelect } from './components/FilterSelect';
import { Loader } from './components/Loader';
import { LoadMoreButton } from './components/LoadMoreButton';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetailsPage } from './components/PokemonDetailsPage';

function App() {
  const [pokemonDataCurrentList, setPokemonDataCurrentList] = useState([]);
  const [filtredBy, setFiltredBy] = useState('All');

  const [isFetching, setIsFetching] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [pokemonId, setPokemonId] = useState(null);

  async function fetchAndCathError(link) {
    try {
      setIsFetching(true);
      const res = await fetch(link);
      const data = await res.json();

      return data;
    }
    catch(err){
      console.error(err);
      alert('Something went wrong, try again later');
    }
    finally{
      setIsFetching(false);
    }
  }

  const handleLoadMore = async () => {
    if (nextPage) {
     const response = await fetchAndCathError(nextPage);
     const links = await response?.results.map((el) => el.url);
     const promises = links.map(async (link) => {
      return await fetchAndCathError(link);
    });
    const data = await Promise.all(promises);

    setPokemonDataCurrentList([...pokemonDataCurrentList, ...data]);
    setNextPage(response.next);

    }else {
      alert("It's all pokemons");
    }
  };

  const handleSelect = (value) => {
    setFiltredBy(value);
  };

  const getFiltredPokemonList = (filtredBy) => {
    if (filtredBy === 'All') {

      return pokemonDataCurrentList;
    }
    let pokemonFiltredList = pokemonDataCurrentList;
    pokemonFiltredList = pokemonFiltredList.filter((el) => {
     return el.types.some((el) => {
       return el.type.name === filtredBy;
      });
    });

    return pokemonFiltredList;
  };

  useEffect(() => {
    async function fetchData() {
      const getPokemonsUrl = (arr) => {
        const data = arr?.map((item) => {
          return fetchAndCathError(item.url);
        });
        return data;
      };
      const response = await fetchAndCathError('https://pokeapi.co/api/v2/pokemon/?limit=12');
      setNextPage(response.next);
      const list = await Promise.all(getPokemonsUrl(response?.results));
      setPokemonDataCurrentList((list));
    }

    fetchData();
    
  },[]);
  
  return (
    <Box className="App">
      <Header 
        width='100%'
        background='brand'
        justify='center' 
        className="App-header">
        <Heading>Pokedex</Heading>
      </Header>
      <Main direction='row'>
        <Box className='pokemons-container'>
          <FilterSelect pokemonList={pokemonDataCurrentList} handleSelect={handleSelect}/>
          <Box justify='center' direction='row' wrap={true}>
            {
              getFiltredPokemonList(filtredBy).map((pokemon) => 
                <PokemonCard 
                  setPokemonId = {setPokemonId}
                  key={pokemon.id} {...pokemon}/>)
            }
          </Box>
            {
            isFetching ?  <Loader/> : <LoadMoreButton handleLoadMore={handleLoadMore}/>
            }
        </Box>
        <PokemonDetailsPage pokemonId={pokemonId}/>
      </Main>
    </Box>
  );
}

export default App;
