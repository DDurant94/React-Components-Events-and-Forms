import { array, func } from 'prop-types';
import "./../Styles-Components/CharacterListStyles.css";

const CharacterList = ({characters,onCharacterSelect}) => {

  return (
    <section className='container-fluid-center'>

      <div className='container-fluid-center m-3 p-3 font-monospace'>

        <h2 className='text-center'>Marvel Characters:</h2>

        <ul className='row g-5'>
            {characters.map(character => (
            <li key={character.id} className='col-lg-4 col-md-4 col-sm-6 bg-dark text-light p-3 list-group-item'>
            <img id="character-list-img" className='img-fluid rounded' src={ `${character.thumbnail.path}.${character.thumbnail.extension}`} alt={`Picture of ${character.name}`} onClick={() => onCharacterSelect(character.id)}/> <br />
            <h3 className='text-center mt-4'>{character.name}</h3> <br />
          </li>))}

        </ul>

      </div>

    </section>

  );


};

CharacterList.propTypes = {
  characters: array,
  onCharacterSelect: func
}

export default CharacterList;