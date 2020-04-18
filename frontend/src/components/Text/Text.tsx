import React, { ReactNode } from 'react';
import { fontStyles } from '../../stylesheet';
import styled from 'styled-components';

interface propTypes {
  children: ReactNode;
}

const BasicText = styled.div`
  font-family: ${fontStyles.regular.fontFamily};
  font-size: ${fontStyles.regular.fontSize};
  font-weight: ${fontStyles.regular.fontWeight};
`;

const Text: React.FunctionComponent<propTypes> = props => {
  return <BasicText>{props.children}</BasicText>;
};

export default Text;
