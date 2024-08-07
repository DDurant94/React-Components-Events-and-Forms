import { useEffect,useState } from "react";
import { number,func } from 'prop-types';
import axios from "axios";

const CharacterDetails = ({selectedCharacter, onClosePage}) => {
  const [characterData, setCharacterData] = useState([]);
  const [gettingData,setGettingData] = useState(true);
 
  useEffect(() => {
      const CharacterSearch = async () => {
        try{
          if(selectedCharacter){
            const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${selectedCharacter}?ts=1721929446898&apikey=6ff4859c9f07b04770921cd2eae2b91c&hash=7e91063979f9c9e893ef49c91351f283`);
            setCharacterData(response.data.data.results);
            setGettingData(false);
          }
  
        }catch(error){
          console.log("Error fetching data from API:",error)
          onClosePage()
        }
      };
      CharacterSearch()
  },[selectedCharacter]);

  if(gettingData) return <p className="text-center fs-1 text-dark-emphasis">Loading...</p>;
  
  return (
    <section className="container-fluid-center m-5 p-4 bg-black text-light rounded shadow font-monospace">

      <div className="row g-4">

        <div className="col-12 container-fluid-center p-3">

          <h3 className="text-center">{characterData[0].name} Details:</h3>

        </div>

        <div className="col-12 container-fluid-center p-3">

          <div className="">

            <img className='img-fluid rounded shadow mx-auto d-block' style={{width: 380+"px", height: "auto"}} src={`${characterData[0].thumbnail.path}.${characterData[0].thumbnail.extension}`} alt={`Picture of ${characterData[0].name}`}/>

          </div>

        </div>

        <div className="col-12 container-fluid-center p-3">

          <h4>Description:</h4>
          {characterData[0].description.length === 0 ? <p>No Description</p>:<p>{characterData[0].description}</p>}

        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 container-fluid-center p-3">

          <h4>Comics:</h4>

          <ul>

            {characterData[0].comics.items.length === 0 ? <li className="rounded">No Comics</li> : characterData[0].comics.items.map((item, i=0) => <li className="rounded" key={i++}>{item.name}</li>)}

          </ul>

        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 container-fluid-center p-3">

          <h4>Stories:</h4>

          <ul>

            {characterData[0].stories.items.length === 0 ? <li className="rounded">No Stories</li> : characterData[0].stories.items.map((item, i=0) => <li className="rounded" key={i++}>{item.name}</li>)}

          </ul>

        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 container-fluid-center p-3">

          <h4>Series:</h4>

          <ul>

          {characterData[0].series.items.length === 0 ? <li className="rounded" >No Series</li> : characterData[0].series.items.map((item, i=0) => <li className="rounded" key={i++}>{item.name}</li>)}

          </ul>

        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 container-fluid-center p-3">

          <h4>Events:</h4>

          <ul>

          {characterData[0].events.items.length === 0 ? <li className="rounded">No Events</li> : characterData[0].events.items.map((item, i=0) => <li className="rounded" key={i++}>{item.name}</li>)}

          </ul>

        </div>



      </div>

      <button className="btn btn-danger my-4" onClick={() => onClosePage()}>Close Details</button>

    </section>
  );

};

CharacterDetails.propType = {
  selectedCharacter: number,
  onClosePage: func
}

export default CharacterDetails;