import React from 'react';
import { roomHeaderStyle } from './Styles';
import { RowGrid, ItemGrid, CustomButton } from './Molecules';

const RoomHeader = () => {
    const handleConnect = () => {
        console.log('Connect button clicked');
    };

    return (
        <RowGrid style={{ ...roomHeaderStyle }} xs={12}>
            <ItemGrid xs={3}>Player 1</ItemGrid>
            <ItemGrid xs={3}>
                Singularity Sprint
            </ItemGrid>
            <ItemGrid xs={3}>Room: 62HJY</ItemGrid>
            <ItemGrid xs={3}>
                <CustomButton label="Connect" onClick={handleConnect} />
            </ItemGrid>
        </RowGrid>
    );
};

export { RoomHeader };
