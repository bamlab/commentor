import styled, { css } from 'styled-components';
import { borderRadius, colorUsage, fontStyles, getSpacing } from 'stylesheet';

interface Props {
  hasError?: boolean;
}

export const InputCssStyle = css`
  font-family: ${fontStyles.regular.fontFamily};
  font-size: ${fontStyles.regular.fontSize};
  font-weight: ${fontStyles.regular.fontWeight};
  background-color: ${colorUsage.background};
  padding:  ${getSpacing(1)} ${getSpacing(2)};
  border-radius: ${borderRadius};
  border: 0;
  outline: none;
  ::placeholder {
    color: ${colorUsage.placeHolderText};
  }
  :hover {
    border-color: ${colorUsage.lines};
  }
  border-color: ${colorUsage.lines};
`;

export const ErrorCssDiff = css`
  border-color: ${colorUsage.error};
`;

const Input = styled.input<Props>`
  ${InputCssStyle};
  height: 30px;
  ${props => (props.hasError ? `${ErrorCssDiff}` : '')};
`;

Input.displayName = 'Input';

export default Input;
