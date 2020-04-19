import React, { useEffect } from 'react';
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
  GithubAuthentButton,
  GithubLogo,
  GithubAuthentButtonText,
  IllustrationContainer,
  OnboardingIllustration,
  OnbooardingTextContainer,
  OnboardingText,
} from './Login.style';
import logoText from 'assets/logo-text.svg';
import onboardingIllustration from 'assets/onboarding-illustration.png';
import githubLogo from 'assets/octocat.png';

import { LoginPropsType } from './Login.type';

const Login = React.memo<LoginPropsType>(props => {
  const { login, location, isAuthenticated } = props;
  useEffect(() => {
    const componentDidMount = async () => {
      const params = queryString.parse(location.search);
      if (params.code && typeof params.code === 'string' && !isAuthenticated) {
        await login(params.code);
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
            <GithubAuthentButton
              onClick={() => {
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${
                  process.env.REACT_APP_GITHUB_APP_CLIENT_ID
                }`;
              }}
            >
              <GithubLogo src={githubLogo} />
              <GithubAuthentButtonText>
                <FormattedMessage id="login.authenticate-via-github" />
              </GithubAuthentButtonText>
            </GithubAuthentButton>
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
    </Container>
  );
});

export default Login;
