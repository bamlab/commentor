import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GithubAuthentButton, GithubLogo, GithubAuthentButtonText } from './GithubButton.style';
import githubLogo from 'assets/octocat.png';

export const GithubButton = React.memo(() => {
  return (
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
  );
});
