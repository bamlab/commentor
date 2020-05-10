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
  GitlabAuthentButton,
  GithubLogo,
  GitlabLogo,
  GithubAuthentButtonText,
  GitlabAuthentButtonText,
  IllustrationContainer,
  OnboardingIllustration,
  OnbooardingTextContainer,
  OnboardingText,
} from './Login.style';
import logoText from 'assets/logo-text.svg';
import onboardingIllustration from 'assets/onboarding-illustration.png';
import githubLogo from 'assets/octocat.png';
import gitlabLogo from 'assets/gitlab-logo.png';

import { LoginPropsType } from './Login.type';

const Login = React.memo<LoginPropsType>(props => {
  const { login, location, isAuthenticated } = props;
  useEffect(() => {
    const componentDidMount = async () => {
      const params = queryString.parse(location.search);
      console.log('PARAMS', params);
      if (
        params.state &&
        typeof params.state === 'string' &&
        (params.state === 'gitlab' || params.state === 'github')
      ) {
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
            <GithubAuthentButton
              onClick={() => {
                window.location.href = `https://github.com/login/oauth/authorize?state=github&client_id=${
                  process.env.REACT_APP_GITHUB_APP_CLIENT_ID
                }`;
              }}
            >
              <GithubLogo src={githubLogo} />
              <GithubAuthentButtonText>
                <FormattedMessage id="login.authenticate-via-github" />
              </GithubAuthentButtonText>
            </GithubAuthentButton>
            <GitlabAuthentButton
              onClick={() => {
                window.location.href = `https://gitlab.com/oauth/authorize?state=gitlab&response_type=code&scope=read_user+api&redirect_uri=http://localhost:3000&state=gitlab&client_id=${
                  process.env.REACT_APP_GITLAB_APP_CLIENT_ID
                }`;
              }}
            >
              <GitlabLogo src={gitlabLogo} />
              <GitlabAuthentButtonText>
                <FormattedMessage id="login.authenticate-via-gitlab" />
              </GitlabAuthentButtonText>
            </GitlabAuthentButton>
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
