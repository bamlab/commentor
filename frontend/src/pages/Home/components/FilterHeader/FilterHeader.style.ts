import { getSpacing, fontStyles } from '../../../../stylesheet';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${getSpacing(1.5)};
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin: 0 ${getSpacing(1.5)} 0 ${getSpacing(1.5)};
  padding: ${getSpacing(1)};
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FiltersPrefix = styled.p`
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  margin-right: ${getSpacing(1.5)};
`;

export const FilterSpacer = styled.div`
  margin: ${getSpacing(1.5)};
`;
