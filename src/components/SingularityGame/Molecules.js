import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { customButtonStyle, gridBorderStyle } from './Styles';

export const ContainerGrid = ({ children, ...props }) => {
  return (
    <Grid container direction="column" style={{ ...gridBorderStyle, ...props.style }} {...props}>
      {children}
    </Grid>
  );
};

export const ItemGrid = ({ children, ...props }) => {
  return <Grid item style={{...gridBorderStyle, ...props.style }} {...props}>{children}</Grid>;
};

export const RowGrid = ({ children, ...props }) => {
  return <Grid item container direction="row" style={{...gridBorderStyle, ...props.style }} {...props}>{children}</Grid>;
};

export const ColumnGrid = ({ children, ...props }) => {
  return <Grid item container direction="column" style={{...gridBorderStyle, ...props.style }} {...props}>{children}</Grid>;
};

export const CustomButton = ({ label, onClick, ...props }) => {
  return (
    <Button style={{ ...customButtonStyle, ...props.style }} onClick={onClick} {...props}>
      {label}
    </Button>
  );
};
