import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

import Button from 'components/Button';
import { PATHS } from 'routes';
import { Container, Content, InputLabel, Input, Message } from './Avatar.style';

export interface Props {
  fetchUser: (username: string) => void;
  intl: InjectedIntl;
  push: (pathName: string) => void;
  updateUsername: (value: string) => void;
  userAvatarUrl: string | null;
  username: string | null;
}

class Avatar extends React.PureComponent<Props> {
  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { updateUsername } = this.props;
    updateUsername(event.target.value);
  };

  fetchUser = () => {
    const { fetchUser, username } = this.props;
    if (username) {
      fetchUser(username);
    }
  };

  navigateTo = (path: string) => () => {
    const { push } = this.props;
    push(path);
  };

  render() {
    const { intl, userAvatarUrl } = this.props;
    const { formatMessage } = intl;

    return (
      <Container>
        <Content>
          <Button tabIndex={0} onClick={this.navigateTo(PATHS.HOME)}>
            <FormattedMessage id="page.back" />
          </Button>
          <Message>
            <FormattedMessage id="page.api-to-translate-example" />
          </Message>
          <InputLabel>{formatMessage({ id: 'page.add-github-username' })}</InputLabel>
          <Input id="github-avatar-input" type="text" onChange={this.onInputChange} />
          <br />
          <Button onClick={this.fetchUser}>
            <FormattedMessage id="page.fetch-github-avatar" />
          </Button>
          {userAvatarUrl && <img src={userAvatarUrl} alt="user avatar" />}
        </Content>
      </Container>
    );
  }
}

export default Avatar;
