import { useEffect ,useState } from 'react';
import axios from 'axios';

function CharacterList () {
  const [name, setName] = useState('');
  const [character, setCharacter] = useState([])
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);



  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    return errors;
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if(Object.keys(errors).length === 0){
      setSubmitting(true);
      setError(null);
      try{
        if(name){
          const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1721929446898&apikey=6ff4859c9f07b04770921cd2eae2b91c&hash=7e91063979f9c9e893ef49c91351f283`);
          setCharacter(response);
          console.log(character.data);
        }
        await new Promise((resolve,reject) => setTimeout(resolve,1000));
        setName('');
        setSubmitting(false)
        console.log(character.results);
      } catch(error) {
        console.error('Error submitting product:', error)
        setError(error.toString());
        setSubmitting(false)
        setName('');
      }
    } else {
      setErrors(errors);
      
    } 
  };

  if(submitting) return <p>Submitting Search data...</p>;
  if(error) return <p>Error getting search data:</p>;

  return (
    <div>

      <h2>Enter Characters Name:</h2>

      <form onSubmit={handleSubmit} id="character-search-form">

        <input type="text" value={name} onChange={(e) => (setName(e.target.value))}/>
        {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}

        <button form="add-product-form">Submit</button>

      </form>


    
    </div>
  );
};

export default CharacterList;