import React from 'react';
import { HoverButtonContainerStyled } from './HoverButtonContainer.style';

interface IPropsType {
  children: React.ReactNode;
}

export const HoverButtonContainer: React.FunctionComponent<IPropsType> = ({ children }) => (
  <HoverButtonContainerStyled>{children}</HoverButtonContainerStyled>
);
