import styled, { css } from 'styled-components';
import { borderRadius, colorUsage, getSpacing, fontStyles } from 'stylesheet';

interface ILink {
  href?: string;
  to?: string;
  disabled?: boolean;
}

const Link = styled.a<ILink>`
  padding: ${getSpacing(2)} ${getSpacing(4)};

  font-weight: ${fontStyles.bold.fontWeight};
  font-family: ${fontStyles.bold.fontFamily};
  font-size: ${fontStyles.bold.fontSize};

  color: ${props => (props.disabled ? colorUsage.disabled : colorUsage.text)};
  transition: color 0.3s ease-in-out;

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  border: none;
  border-radius: ${borderRadius};

  :hover {
    color: ${props => (props.disabled ? colorUsage.disabled : colorUsage.highlight)};
  }
`;

export default Link;
