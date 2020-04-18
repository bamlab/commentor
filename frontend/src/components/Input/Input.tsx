import styled from 'styled-components';
import { borderRadius, colorUsage, fontStyles, getSpacing } from 'stylesheet';

const getBorderColor = (originalColor: string, hasError?: boolean): string =>
  hasError ? colorUsage.error : originalColor;

interface Props {
  hasError?: boolean;
}

const Input = styled.input<Props>`
  font-family: ${fontStyles.regular.fontFamily};
  font-size: ${fontStyles.regular.fontSize};
  font-weight: ${fontStyles.regular.fontWeight};
  width: 100%;
  height: 60px;
  background-color: ${colorUsage.background};
  padding: 0 ${getSpacing(3)};
  border-radius: ${borderRadius};
  border: 1px solid;
  border-color: ${props => getBorderColor(colorUsage.lines, props.hasError)};

  :hover {
    border-color: ${props => getBorderColor(colorUsage.lines, props.hasError)};
  }

  :focus {
    border-color: ${props => getBorderColor(colorUsage.lines, props.hasError)};
  }

  ::placeholder {
    color: ${colorUsage.placeHolderText};
  }
`;
Input.displayName = 'Input';

export default Input;
