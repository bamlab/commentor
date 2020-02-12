import React, { ReactNode } from 'react';
import { fontFamily, fontSize } from '../../stylesheet';
import styled from 'styled-components';

interface propTypes {
  children: ReactNode;
}

const BasicText = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
`;

const Text: React.FunctionComponent<propTypes> = props => {
  return <BasicText>{props.children}</BasicText>;
};

export default Text;
