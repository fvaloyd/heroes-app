import { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import heroImages from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

// import batman from '../../assets/dc-batman.jpg'; //Estatico

export const HeroScreen = () => {

  const parametrosURL = useParams();
  
  const hero = useMemo(() => getHeroById(parametrosURL.id), [parametrosURL.id]);
  
  const navigate = useNavigate();
  
  if (!hero) {
    return <Navigate to={'/'} />
  }
  const handleReturn = () => {
    // if(publisher === 'Marvel Comics'){
    //   navigate('/marvel')
    // }
    // if(publisher === 'DC Comics'){
    //   navigate('/dc')
    // }
    navigate( -1 )
  }
  const {
    id,
    superhero,
    alter_ego,
    characters,
    publisher,
    first_appearance
  } = hero;
  
  // const imgPath = `/assets/${ id }.jpg`;

  return (
    <div className='row mt-5'>

      <div className='col-4'>
        <img 
          // src={imgPath} Desde el la carpeta public
          // src={ batman } Import estatico
          src={ heroImages(`./${id}.jpg`) }
          alt={ superhero }
          className='img-thumbnail animate__animated animate__bounceInLeft' 
        />
      </div>

      <div className='col-8 animate__animated animate__fadeIn'>
        <h3>{ superhero }</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Alter ego: </b>{ alter_ego }</li>
          <li className='list-group-item'> <b>Publisher: </b>{ publisher }</li>
          <li className='list-group-item'> <b>First appearance: </b> { first_appearance }</li>
        </ul>
      <h5 className='mt-3'>Characters</h5>
      <p>{ characters }</p>

      <button 
        className='btn btn-outline-info'
        onClick={ handleReturn }  
      >
        Return
      </button>

      </div>
    </div>
  )
}
