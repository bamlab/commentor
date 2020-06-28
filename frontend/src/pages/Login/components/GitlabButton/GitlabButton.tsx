import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GitlabAuthentButton, GitlabLogo, GitlabAuthentButtonText } from './GitlabButton.style';
import gitlabLogo from 'assets/gitlab-logo.png';
import { GitlabButtonPropsType } from './GitlabButton.type';

export const GitlabButton = React.memo<GitlabButtonPropsType>(props => {
  return (
    <GitlabAuthentButton onClick={props.onClick}>
      <GitlabLogo src={gitlabLogo} />
      <GitlabAuthentButtonText>
        <FormattedMessage id={props.translationKey || 'login.authenticate-via-gitlab'} />
      </GitlabAuthentButtonText>
    </GitlabAuthentButton>
  );
});
