import { Box, Button, Header, Heading, Main } from 'grommet';
import { useEffect, useState } from 'react';
import './App.css';
import { FilterSelect } from './components/FilterSelect';
import { Loader } from './components/Loader';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetails } from './components/PokemonDetails';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredBy, setFilteredBy] = useState('All');

  const [isFetching, setIsFetching] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [selectedPokemon, setSelectedpokemon] = useState();

  async function makeRequest(link) {
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

  const loadMore = async () => {
    if (!nextPage) {
      alert("It's all pokemons");

      return
    }

    const response = await makeRequest(nextPage);
    const links = await response?.results.map((el) => el.url);
    const promises = links.map(makeRequest);
    const data = await Promise.all(promises);

    setPokemonList([...pokemonList, ...data]);
    setNextPage(response.next);
  };

  const getFilteredPokemonList = (filteredBy) => {
    if (filteredBy === 'All') {

      return pokemonList;
    }
    let pokemonFilteredList = pokemonList.filter((el) => el.types.some((el) => el.type.name === filteredBy))
  
    return pokemonFilteredList;
  };

  const createSelectOptions = (arr) => {
    const result = [];
    arr.forEach((el) => {
      el.types.forEach((el) => {
        result.push(el.type.name);
      });
    });
  
    return [...new Set(result)];
  };

  const optionsList = ['All', ...createSelectOptions(pokemonList)];

  useEffect(() => {
    async function fetchData() {
      const getPokemonsUrl = (arr) => {
        const data = arr?.map((item) => {
          return makeRequest(item.url);
        });
        return data;
      };
      const response = await makeRequest('https://pokeapi.co/api/v2/pokemon/?limit=12');
      setNextPage(response.next);
      const list = await Promise.all(getPokemonsUrl(response?.results));
      setPokemonList(list);
    }

    fetchData();
  },[]);
  
  return (
    <Box className="App">
      <Header 
        width="100%"
        background="brand"
        justify="center" 
        className="App-header">
        <Heading>Pokedex</Heading>
      </Header>
      <Main direction="row">
        <Box className="pokemons-container">
          <FilterSelect optionsList={optionsList} onSelect={setFilteredBy}/>
          <Box justify="center" direction="row" wrap={true}>
            {
              getFilteredPokemonList(filteredBy).map((pokemon) => 
                <PokemonCard 
                  onClick = {setSelectedpokemon}
                  key={pokemon.id} {...pokemon}/>)
            }
          </Box>
            {
            isFetching 
              ? <Loader/> 
              : <Button 
                  onClick={loadMore} 
                  alignSelf="center" 
                  primary 
                  size="medium"
                  margin="20px 0"
                  label="Load more">
                </Button>
            }
        </Box>
       { selectedPokemon ? <PokemonDetails {...selectedPokemon}/> : <></> }
      </Main>
    </Box>
  );
}

export default App;
