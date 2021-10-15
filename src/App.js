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
  const [select, setSelect] = useState('All');

  const [isFetching, setIsFetching] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [pokemonId, setPocemonId] = useState(null);

  async function fetchAndCathError(link) {
    try{
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

  const handleLoadMore = () => {
    if (nextPage) {
      fetchAndCathError(nextPage)
      .then((res) => {
        const links = res?.results.map(el => el.url);
        
        const promises = links.map((link) => {
          return fetchAndCathError(link)
        });
        Promise.all(promises)
          .then((data) => setPokemonDataCurrentList([...pokemonDataCurrentList, ...data]));
          setNextPage(res.next);
      })
    }else {
      alert("It's all pokemons");
    }
  }

  const handleSelect = (value) => {
    setSelect(value)
  }

  const getFiltredPokemonList = (select) => {
    if (select === 'All') {

      return pokemonDataCurrentList
    }
    let pocemonFiltredList = pokemonDataCurrentList;
    pocemonFiltredList = pocemonFiltredList.filter((el) => {
     return el.types.some((el) => {
       return el.type.name === select
      })
    })

    return pocemonFiltredList;
  } 

  useEffect(() => {
    const getPokemonsUrl = (arr) => {
      const data = arr?.map((item) => {
        return fetchAndCathError(item.url)
      })
      return data;
    }

    fetchAndCathError('https://pokeapi.co/api/v2/pokemon/?limit=12')
      .then((res) => {
        setNextPage(res.next);
      Promise.all(getPokemonsUrl(res?.results))
        .then((res) => setPokemonDataCurrentList((res)));
      })
  },[])
  
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
              getFiltredPokemonList(select).map((pokemon) => 
                <PokemonCard 
                  setPocemonId = {setPocemonId}
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
