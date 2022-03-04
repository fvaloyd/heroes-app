let heroImages = () => {};
try{
    heroImages = require.context('../assets', true);
}catch(error){}

export default heroImages;