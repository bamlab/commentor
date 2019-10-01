import styled from 'styled-components';
import { borderRadius, colorUsage, fontFamily, fontSize, getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: ${getSpacing(80)};
`;

export const InputLabel = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};
  margin-bottom: ${getSpacing(1)};
`;

export const Input = styled.input`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  width: 100%;
  height: ${getSpacing(8)};
  background-color: ${colorUsage.inputBackground};
  padding: 0 ${getSpacing(3)};
  border-radius: ${borderRadius.medium};
  border: 1px solid;
  margin-bottom: ${getSpacing(2)};
  border-color: ${colorUsage.inputBorderColor};

  :hover {
    border-color: ${colorUsage.primaryTextColor};
  }

  :focus {
    border-color: ${colorUsage.primary};
  }

  ::placeholder {
    color: ${colorUsage.inputPlaceholderColor};
  }
`;

export const Message = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  margin-bottom: ${getSpacing(1)};
`;
