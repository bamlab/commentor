import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Loader from './Loader';

storiesOf('Loader', module)
  .addDecorator(withKnobs)

  .add('with no props', () => <Loader />)

  .add('playground', () => <Loader />);
