import React from 'react';
import { ButtonStyled } from './Button.styled';

export const Button = ({ getPage }) => {
  return <ButtonStyled onClick={getPage}>Load more</ButtonStyled>;
};
