import { Link } from 'react-router-dom';
import  heroImages from '../../helpers/heroImages';

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters
}) => {

  // const imgPath = `/assets/${id}.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card h-100">
        <div className="row no-gutters">
          
          <div className="col-4 ">
            <img src={ heroImages(`./${id}.jpg`) } className="card-img" alt={superhero}/>
          </div>

          <div className="col-8">
            <div className="card-body">

              <h5 className="card-title">{ superhero }</h5>
              <p className="card-text">{ alter_ego }</p>

              {
                ( alter_ego !== characters ) && <p className="text-muted">{ characters }</p>
              }

              <p className="card-text">
                <small className="text-muted">{ first_appearance }</small>
              </p>

              <Link to={`/hero/${id}`}>
                Mas...
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
