import React, { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'

import axios from 'axios'
//components
import PokeCard from '../../components/PokeCard.jsx'
import AutoComplete from '../../components/AutoComplete'


function MainPage() {
  //All pokemons data State 
const [allPokemonsData, setAllPokemonsData] = useState([]); 
  //displayed pokemons data State 
const [displayedPokemons, setDisplayedPokemons] = useState([]);

//한번에 보여지는 포켓몬 수 
const limitNum = 20; 
// 0 ~ 1008 data request
const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;


  

//  const debouncedSearchTerm = useDebounce(searchTerm,500);
  

  // (true) first request (false) second ~ request 
  useEffect(()=> { 
    fetchPokeData()
  }, [])

  const filterDisplayedPokemonData = (allPokemonsData, displayedPokemons = [] ) => {
    const limit = displayedPokemons.length + limitNum;
    //  all pokemons data .length + 
    const array = allPokemonsData.filter((pokemon, index) => index + 1 <=limit);
    return array ;
  
  }
  



    const fetchPokeData = async () => {
      
      try{
      // 1008 pokemons data request d
        const response = await axios.get(url);
        setAllPokemonsData(response.data.results)
        //display pokemon data state
        setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
        
      }catch (error){
        console.error(error) ; 
      }
    }
  return (
    <article className='pt-6'> 
    <header className='flex flex-col gap-2 w-full px-4 z-50'>
     <AutoComplete 
      allPokemonsData = {allPokemonsData}
      setDisplayedPokemons = {setDisplayedPokemons}
     />
   
    </header>
    <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
      <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'> 
        {displayedPokemons.length > 0 ? 
        (
          displayedPokemons.map(({name , url}, index)=> (
            <div>
              <PokeCard key={url} url={url} name={name}/>
            </div> 
          ))

        ) : (
          <h2 className='font-medium text-lg text-slate-900 mb-1'>
            포켓몬이 없습니다.
          </h2>
        )}

      </div>
    </section>
        <div className='text-center'>
          {(allPokemonsData.length > displayedPokemons.length) && (displayedPokemons.length !== 1) &&
          (
            <button 
          onClick={() => setDisplayedPokemons(filterDisplayedPokemonData( allPokemonsData , displayedPokemons)) }
          className = 'bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
          >
            더보기
          </button>

          )
          }
          
        </div>

    </article>
  )
}

export default MainPage
