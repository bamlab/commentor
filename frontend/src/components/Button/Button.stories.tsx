import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from './Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)

  .add('with no props', () => <Button />)
  .add('label', () => <Button>{text('Label', 'Coucou')}</Button>)

  .add('disabled', () => <Button disabled={boolean('disabled', true)} />)
  .add('onClick', () => <Button onClick={action('on Click')} />)

  .add('playground', () => (
    <Button onClick={action('on Click')} disabled={boolean('disabled', true)}>
      {text('Label', 'Hello Storybook')}
    </Button>
  ));
