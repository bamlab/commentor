import styled from 'styled-components';
import { colorUsage, getSpacing, fontStyles } from 'stylesheet';

interface ILink {
  href?: string;
  to?: string;
  activeStyle?: Record<string, any>;
  isActive?: (match: any, location: any) => boolean;
}

const Link = styled.p<ILink>`
  padding: ${getSpacing(2)} ${getSpacing(4)} ${getSpacing(2)} 0;
  font-weight: ${fontStyles.bold.fontWeight};
  font-family: ${fontStyles.bold.fontFamily};
  font-size: ${fontStyles.bold.fontSize};
  color: ${colorUsage.placeHolderText};
  transition: color 0.3s ease-in-out;
  cursor: 'pointer';
  :hover {
    color: ${colorUsage.text};
  }
`;

export default Link;
