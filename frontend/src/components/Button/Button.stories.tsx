import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from './Button';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('with a button', () => (
  <Button disabled={boolean('Disabled', false)}>{text('Label', 'Hello Storybook')}</Button>
));
