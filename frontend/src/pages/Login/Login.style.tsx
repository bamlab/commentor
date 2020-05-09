import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage, borderRadius } from 'stylesheet';

const LOGO_HEIGHT = 24;

const VERSIONNING_PLATFORMS_LOGO_HEIGHT = 30;

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const LeftCardContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${getSpacing(4)};
  min-height: 400px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: ${LOGO_HEIGHT}px;
`;

export const ContentPositioner = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

export const Title = styled.p`
  text-transform: uppercase;
  font-family: ${fontStyles.title.fontFamily};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
  text-align: center;
  width: 100%;
  margin: ${getSpacing(1.5)} 0 ${getSpacing(1.5)} 0;
`;

export const Subtitle = styled.p`
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  margin: ${getSpacing(1.5)} 0 ${getSpacing(1.5)} 0;
  line-height: 20px;
  text-align: center;
  width: 100%;
`;

export const GithubAuthentButton = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  margin: ${getSpacing(1.5)} 0 ${getSpacing(1.5)} 0;
  background-color: #25292e;
  padding: ${getSpacing(1)} 0 ${getSpacing(1)} 0;
  cursor: pointer;
  border-radius: ${borderRadius};
`;

export const GitlabAuthentButton = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  margin: ${getSpacing(1.5)} 0 ${getSpacing(1.5)} 0;
  background-color: #684ec4;
  padding: ${getSpacing(1)} 0 ${getSpacing(1)} 0;
  cursor: pointer;
  border-radius: ${borderRadius};
`;

export const GithubLogo = styled.img`
  height: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  width: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  margin: 0 ${getSpacing(1)} 0 0;
`;

export const GitlabLogo = styled.img`
  height: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  width: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  margin: 0 ${getSpacing(1)} 0 0;
`;

export const GithubAuthentButtonText = styled.p`
  text-transform: uppercase;
  font-family: ${fontStyles.buttons.fontFamily};
  font-weight: ${fontStyles.buttons.fontWeight};
  font-size: ${fontStyles.buttons.fontSize};
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
  color: white;
`;

export const GitlabAuthentButtonText = styled.p`
  text-transform: uppercase;
  font-family: ${fontStyles.buttons.fontFamily};
  font-weight: ${fontStyles.buttons.fontWeight};
  font-size: ${fontStyles.buttons.fontSize};
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
  color: white;
`;

export const IllustrationContainer = styled.div`
  flex: 3;
  min-height: 600px;
`;

export const OnboardingIllustration = styled.img`
  width: 100%;
`;

export const OnbooardingTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OnboardingText = styled.p`
  font-family: ${fontStyles.buttons.fontFamily};
  font-weight: ${fontStyles.buttons.fontWeight};
  font-size: ${fontStyles.buttons.fontSize};
  text-align: center;
  line-height: 20px;
  max-width: 60%;
`;
