import CharacterList from "./Components/Page-Components/CharacterList";
import CharacterDetails from "./Components/Page-Components/CharacterDetails";
import { useState, useEffect } from 'react';
import axios from 'axios';



const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [changePage, setChangePage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      try{
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1721929446898&apikey=6ff4859c9f07b04770921cd2eae2b91c&hash=7e91063979f9c9e893ef49c91351f283`);
        setCharacters(response.data.data.results);
        setChangePage(true);
      } catch(error){
        console.error('Error fetching characters:', error)
      }
    };
    fetchCharacters();
  },[]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setDetailsPage(true);
  };

  const handleCloseDetails = () => {
    if(detailsPage) {
      setDetailsPage(false);
    } else {
      setDetailsPage(true);
    }
  }

  if(detailsPage) return <div className="bg-danger p-3"><h1 className="text-center text-decoration-underline">Details</h1><CharacterDetails selectedCharacter={selectedCharacter} onClosePage={handleCloseDetails}/></div>;

  if(changePage) return <div className="bg-primary-subtle p-3"><h1 className="text-center text-decoration-underline">Welcome to React Marvel API</h1><CharacterList characters = {characters} onCharacterSelect={handleCharacterSelect}/></div>;

  return (
    <div className="bg-dark text-light">

      <h1 className="text-center text-decoration-underline">Welcome to React Marvel API</h1>
      <p className="text-center fs-1 text-dark-emphasis">Loading...</p>

    </div>


  );
}

export default App
