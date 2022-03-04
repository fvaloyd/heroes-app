import { useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm"
import { getHeroByName } from "../../selectors/getHeroByName";

import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [ formState , handleInputChange,] = useForm({
    searchText: q
  });
  
  const { searchText } = formState;
  const memoHeroes = useMemo(() => getHeroByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`)
    location.search = q;
  }

  return (
    <>
        <h1>Search a hero</h1>
        <hr />
        
        <div className="row">

          <div className="col-5">
            <h4>Formulario</h4>
            <hr />

            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder="hero name..."
                autoComplete="off"
                className="form-control"
                name="searchText"
                value={searchText}
                onChange={handleInputChange}
              />
              <button 
                type="submit"
                className="btn btn-outline-info form-control mt-1"
              >
                Search...
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Result</h4>
            <hr />
            {
              (q === '')
                ? <div className="alert alert-info">Buscar un heroe</div>
                : (memoHeroes.length === 0) && <div className="alert alert-danger">No hay resultados: { q }</div>
            }

            {
              memoHeroes.map(hero => (
                <HeroCard 
                  key={ hero.id }
                  { ...hero } 
                />
              ))
            }
          </div>

        </div>
    </>
  )
}
