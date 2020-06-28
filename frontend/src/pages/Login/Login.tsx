import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import {
  Container,
  LeftCardContainer,
  Header,
  Logo,
  ContentPositioner,
  ContentContainer,
  Title,
  Subtitle,
  IllustrationContainer,
  OnboardingIllustration,
  OnbooardingTextContainer,
  OnboardingText,
} from './Login.style';
import { GithubButton } from './components/GithubButton';
import { GitlabButton } from './components/GitlabButton';
import logoText from 'assets/logo-text.svg';
import onboardingIllustration from 'assets/onboarding-illustration.png';

import { LoginPropsType } from './Login.type';
import { GitlabModal } from './components/GitlabModal';

const Login = React.memo<LoginPropsType>(props => {
  const { login, location, isAuthenticated } = props;
  const [isGitlabLoginModalOpen, setGitlabLoginModalOpen] = useState(false);

  useEffect(() => {
    const componentDidMount = async () => {
      const params = queryString.parse(location.search);
      if (params.state && typeof params.state === 'string') {
        if (params.code && typeof params.code === 'string' && !isAuthenticated) {
          await login(params.code, params.state);
        }
      }
    };
    componentDidMount();
  }, []);

  return (
    <Container>
      <LeftCardContainer>
        <Header>
          <Logo alt="commentorlogo" src={logoText} />
        </Header>
        <ContentPositioner>
          <ContentContainer>
            <Title>
              <FormattedMessage id="login.title" />
            </Title>
            <Subtitle>
              <FormattedMessage id="login.description" />
            </Subtitle>
            <GithubButton />
            <GitlabButton
              onClick={() => {
                setGitlabLoginModalOpen(true);
              }}
            />
          </ContentContainer>
        </ContentPositioner>
      </LeftCardContainer>
      <IllustrationContainer>
        <OnboardingIllustration src={onboardingIllustration} />
        <OnbooardingTextContainer>
          <OnboardingText>
            <FormattedMessage id="login.onboarding" />
          </OnboardingText>
        </OnbooardingTextContainer>
      </IllustrationContainer>
      <GitlabModal onClose={() => setGitlabLoginModalOpen(false)} isOpen={isGitlabLoginModalOpen} />
    </Container>
  );
});

export default Login;
