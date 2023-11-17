import React from 'react';
import { ContainerGrid, RowGrid, ItemGrid, ColumnGrid, CustomButton } from './Molecules';
import { gameContainerStyle } from './Styles';


export const GameContainer = () => {
  return (
    <ContainerGrid style={{...gameContainerStyle}}>
      {/* Top Row: Scores and Draw Pile */}
      <RowGrid xs={1.5}>
        <ItemGrid xs={4.5}>
          <ColumnGrid>
            <ItemGrid>P1 Score Line 1</ItemGrid>
            <ItemGrid>P1 Score Line 2</ItemGrid>
            <ItemGrid>P1 Score Line 3</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
        <ItemGrid xs={3}>
          <ColumnGrid>
            <ItemGrid>Draw Pile Card 1</ItemGrid>
            <ItemGrid>Draw Pile Card 2</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
        <ItemGrid xs={4.5}>
          <ColumnGrid style={{ alignItems: 'flex-end' }}>
            <ItemGrid>P2 Score Line 1</ItemGrid>
            <ItemGrid>P2 Score Line 2</ItemGrid>
            <ItemGrid>P2 Score Line 3</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
      </RowGrid>
      
      {/* Middle Row: Played Cards */}
      <RowGrid xs={4.5}>
        <ItemGrid xs={4}>
          <ColumnGrid>
            <ItemGrid>P1 Played Card 1</ItemGrid>
            <ItemGrid>P1 Played Card 2</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
        <ItemGrid xs={4}>
          <ColumnGrid>
            <ItemGrid>Upcoming Card 1</ItemGrid>
            <ItemGrid>Upcoming Card 2</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
        <ItemGrid xs={4}>
          <ColumnGrid>
            <ItemGrid>P2 Played Card 1</ItemGrid>
            <ItemGrid>P2 Played Card 2</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
      </RowGrid>
      
      {/* Bottom Row: Player Hand */}
      <RowGrid xs={6}>
        <ItemGrid xs={12}>
          <ColumnGrid>
            <ItemGrid>Player Hand Card 1</ItemGrid>
            <ItemGrid>Player Hand Card 2</ItemGrid>
            <ItemGrid>Player Hand Card 3</ItemGrid>
          </ColumnGrid>
        </ItemGrid>
      </RowGrid>
    </ContainerGrid>
  );
};

export default GameContainer;
