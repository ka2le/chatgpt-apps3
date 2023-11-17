import game_background from '../../images/singularitySprint/game_background.jpg';

export const gameContainerStyle = {
  backgroundImage: `url(${game_background})`,
  backgroundSize: 'cover', // Make sure the background covers the entire container
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundPosition: 'center', // Center the background image
  height: 'calc(100vh - 40px)',
  backgroundColor: 'white' // Fallback color
};
export const customButtonStyle = {
    backgroundColor: 'black',
    color: 'aqua',
  };
  
  export const gridBorderStyle = {
    border: '1px solid black',
  };
  

  
  export const roomHeaderStyle = {
    height:"40px", 
    background:"white"
  }
  