import React, { useState } from 'react';
import {
  GitlabAuthentModal,
  GitlabAuthentModalContainer,
  GitlabPublicAuthentContainer,
  GitlabOnPremiseAuthentContainer,
  GitlabOnPremiseAutentInput,
} from './GitlabModal.style';
import { GitlabModalPropsType } from './GitlabModal.type';
import { GitlabButton } from '../GitlabButton';

export const GitlabModal = React.memo<GitlabModalPropsType>(props => {
  const [gitlabCustomDomain, setGitlabCustomDomain] = useState('');

  return (
    <GitlabAuthentModal
      id="gitlabAuthentModal"
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      contentLabel={'Authenticate with gitlab'}
    >
      <GitlabAuthentModalContainer>
        <GitlabPublicAuthentContainer>
          <GitlabButton
            onClick={() => {
              window.location.href = `https://gitlab.com/oauth/authorize?response_type=code&scope=read_user+api+read_repository&redirect_uri=${
                process.env.REACT_APP_OAUTH_REDIRECT_URL
              }&state=gitlab&client_id=${process.env.REACT_APP_GITLAB_APP_CLIENT_ID}`;
            }}
            translationKey="login.authenticate-via-gitlab-public"
          />
        </GitlabPublicAuthentContainer>
        <GitlabOnPremiseAuthentContainer>
          <GitlabOnPremiseAutentInput
            type="Text"
            placeholder="Enter your custom gitlab domain"
            onChange={event => {
              setGitlabCustomDomain(event.target.value);
            }}
          />
          <GitlabButton
            onClick={() => {
              window.location.href = `https://${gitlabCustomDomain}/oauth/authorize?response_type=code&scope=read_user+api+read_repository&redirect_uri=${
                process.env.REACT_APP_OAUTH_REDIRECT_URL
              }&state=gitlab-premise(${gitlabCustomDomain})&client_id=${
                process.env.REACT_APP_GITLAB_APP_CLIENT_ID
              }`;
            }}
            translationKey="login.authenticate-via-gitlab-on-premise"
          />
        </GitlabOnPremiseAuthentContainer>
      </GitlabAuthentModalContainer>
    </GitlabAuthentModal>
  );
});
