import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Logo,
  WelcomeMessage,
  GithubLogo,
  GithubAuthentButtonText,
  GithubAuthentButton,
  GitHubAuthentContainer,
} from './Login.style';
import logo from 'assets/logo-text.svg';
import githubLogo from 'assets/octocat.png';

const Login = React.memo(() => {
  return (
    <GitHubAuthentContainer>
      <Logo alt="commentorlogo" src={logo} />
      <WelcomeMessage>
        <FormattedMessage id="home.welcome-message" />
      </WelcomeMessage>
      <GithubAuthentButton
        onClick={() => {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${
            process.env.REACT_APP_GITHUB_APP_CLIENT_ID
          }`;
        }}
      >
        <GithubLogo src={githubLogo} />
        <GithubAuthentButtonText>
          <FormattedMessage id="home.authenticate-via-github" />
        </GithubAuthentButtonText>
      </GithubAuthentButton>
    </GitHubAuthentContainer>
  );
});

export default Login;
