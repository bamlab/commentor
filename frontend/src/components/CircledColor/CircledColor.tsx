import React from 'react';
import { CircleColorProps } from './CircledColor.type';
import { TickPartLeft, Container, TickPartRight } from './CircledColor.style';

export const CircledColor = (props: CircleColorProps) => {
  return (
    <Container onClick={props.onClick} color={props.color} isSelected={props.isSelected}>
      {props.isSelected ? (
        <>
          <TickPartLeft />
          <TickPartRight />
        </>
      ) : null}
    </Container>
  );
};
