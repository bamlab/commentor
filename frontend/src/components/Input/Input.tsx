import styled from 'styled-components';
import { borderRadius, colorUsage, fontFamily, fontSize, getSpacing } from 'stylesheet';

const getBorderColor = (originalColor: string, hasError?: boolean): string =>
  hasError ? colorUsage.error : originalColor;

interface Props {
  hasError?: boolean;
}

const Input = styled.input<Props>`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  width: 100%;
  height: 60px;
  background-color: ${colorUsage.inputBackground};
  padding: 0 ${getSpacing(3)};
  border-radius: ${borderRadius.medium};
  border: 1px solid;
  border-color: ${props => getBorderColor(colorUsage.inputBorderColor, props.hasError)};

  :hover {
    border-color: ${props => getBorderColor(colorUsage.primaryTextColor, props.hasError)};
  }

  :focus {
    border-color: ${props => getBorderColor(colorUsage.primary, props.hasError)};
  }

  ::placeholder {
    color: ${colorUsage.inputPlaceholderColor};
  }
`;
Input.displayName = 'Input';

export default Input;
