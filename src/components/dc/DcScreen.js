import { HeroList } from "../hero/HeroList";

export const DcScreen = () => {
  
  const PUBLISHER = 'DC Comics';
  
  return (
    <div>
        <h1>DcScreen</h1>
        <hr />

        <HeroList publisher={ PUBLISHER } />
    </div>
  )
}
