import React, { useEffect, useRef, useState } from 'react';
import { RoomHeader } from './RoomManager';
import { GameContainer } from './GameContainer';

export const SingularityGameContainer = () => {
    return (
      <div>
        <RoomHeader />
        <GameContainer />
        {/* More game components will go here */}
      </div>
    );
  };
  
  export default SingularityGameContainer;