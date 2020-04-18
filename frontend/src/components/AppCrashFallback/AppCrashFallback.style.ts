import styled from 'styled-components';
import { colorUsage, fontStyles, getSpacing } from 'stylesheet';
import BaseButton from 'components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
Container.displayName = 'Container';

export const PageContent = styled.div`
  padding: ${getSpacing(8)} ${getSpacing(4)};
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  color: ${colorUsage.text};
`;
PageContent.displayName = 'PageContent';

export const Title = styled.h1`
  font-family: ${fontStyles.title.fontFamily};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
`;
Title.displayName = 'Title';

export const HelperList = styled.ul`
  list-style: disc inside;
  margin-top: ${getSpacing(2)};
`;
HelperList.displayName = 'HelperList';

export const Button = styled(BaseButton)`
  padding: ${getSpacing(1)} ${getSpacing(2)};
`;
