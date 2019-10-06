import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, color, object, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Loader from './Loader';

storiesOf('Loader', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator((story, context) => withKnobs({ escapeHTML: false })(story)(context))

  .add('with no props', () => <Loader />)

  .add('playground', () => <Loader />);
