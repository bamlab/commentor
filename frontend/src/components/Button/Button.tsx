import styled, { css } from 'styled-components';
import { borderRadius, colorUsage, fontStyles, getSpacing } from 'stylesheet';

interface IButton {
  href?: string;
  to?: string;
  disabled?: boolean;
}

const Button = styled.button<IButton>`
  padding: ${getSpacing(2)} ${getSpacing(4)};
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  border: none;
  border-radius: ${borderRadius};
  text-decoration: none;
  color: ${colorUsage.buttonText};
  background-color: ${props => (props.disabled ? colorUsage.disabled : colorUsage.highlight)};
  transition: background-color 0.3s ease-in-out;
  :hover {
    background-color: red;
    ${props => (props.disabled ? '' : `background-color: ${colorUsage.hoverButtonColor};`)}
  }
`;

export default Button;
