import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { HomeContainer, Logo, WelcomeMessage, SelectProjectWrapper } from './Home.style';
import { ProjectIdsMultiSelect } from './components/ProjectIdsMultiSelect';
import logo from 'assets/final_low.png';

type PropsType = {
  loadProjects: () => void;
};

const Home = React.memo<PropsType>(props => {
  useEffect(
    () => {
      props.loadProjects();
    },
    [props],
  );
  return (
    <HomeContainer>
      <Logo alt="commentorlogo" src={logo} />
      <WelcomeMessage>
        <FormattedMessage id="home.welcome-message" />
      </WelcomeMessage>
      <SelectProjectWrapper>
        <FormattedMessage id="home.select-project-label" />
        <ProjectIdsMultiSelect />
      </SelectProjectWrapper>
    </HomeContainer>
  );
});

export default Home;
