import styled from 'styled-components';
import { colorUsage, fontStyles, getSpacing } from 'stylesheet';

export const Label = styled.label`
  display: block;
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
  color: ${colorUsage.text};
  margin-bottom: ${getSpacing(1)};
`;

export const Error = styled.p`
  color: ${colorUsage.error};
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  margin-top: ${getSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${getSpacing(5)};
  width: 100%;
`;
